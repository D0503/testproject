import { PlayActionType } from "@normalized:N&&&entry/src/main/ets/common/ActionUtils&";
export interface SongItem {
    id: string;
    title: string;
    singer: string;
}
export interface SongChangedData {
    isPlay: boolean;
    selectIndex: number;
    songItem: SongItem;
    currentLyric: string;
}
// 确定性演示曲目，保证卡片验证可重复，不依赖网络数据
const DEMO_SONGS: SongItem[] = [
    { id: 'song_001', title: '晨星', singer: '演示歌手A' },
    { id: 'song_002', title: '过山丘', singer: '演示歌手B' },
    { id: 'song_003', title: '夜航', singer: '演示歌手C' }
];
// 每首歌的歌词数组，卡片初始化时预处理，播放中按进度匹配当前行
const DEMO_LYRICS: string[][] = [
    ['晨星点亮了夜空', '风吹过山谷', '我在路上数着灯', '天亮就出发'],
    ['翻过这座山丘', '才知道路的长度', '岁月不回头', '唱着歌继续走'],
    ['夜航的船开着灯', '驶向安静的岸', '星光落在甲板', '梦里也是暖的']
];
// 演示进度步进间隔（ms），模拟音频进度回调推进歌词
const LYRIC_TICK_INTERVAL: number = 5000;
// 演示用播放状态机：维护播放/暂停/切歌/收藏状态并在变化时回调
export class MediaService {
    private static instance: MediaService | undefined = undefined;
    private selectIndex: number = 0;
    private isPlay: boolean = false;
    private lyricIndex: number = 0;
    private lyricTimer: number = -1;
    private collectedIds: Set<string> = new Set<string>();
    private onPlayStateCall: ((data: SongChangedData) => void) | undefined = undefined;
    public static getInstance(): MediaService {
        if (!MediaService.instance) {
            MediaService.instance = new MediaService();
        }
        return MediaService.instance;
    }
    public static getDefaultSong(): SongItem {
        return DEMO_SONGS[0];
    }
    public setOnPlayStateCall(callback: (data: SongChangedData) => void): void {
        this.onPlayStateCall = callback;
    }
    public getCurrentSong(): SongItem {
        return DEMO_SONGS[this.selectIndex];
    }
    // 根据当前播放进度匹配的歌词行
    public getCurrentLyric(): string {
        return DEMO_LYRICS[this.selectIndex][this.lyricIndex];
    }
    // 应用进程销毁前停止歌词进度模拟
    public stopLyricTimer(): void {
        if (this.lyricTimer >= 0) {
            clearInterval(this.lyricTimer);
            this.lyricTimer = -1;
        }
    }
    public isPlaying(): boolean {
        return this.isPlay;
    }
    public isCollected(songId: string): boolean {
        return this.collectedIds.has(songId);
    }
    public setCollected(songId: string, collected: boolean): boolean {
        if (collected) {
            this.collectedIds.add(songId);
        }
        else {
            this.collectedIds.delete(songId);
        }
        this.notifyStateChanged();
        return collected;
    }
    public playByAction(action: PlayActionType): void {
        switch (action) {
            case PlayActionType.PAUSE:
                this.pause();
                break;
            case PlayActionType.PLAY:
                this.play();
                break;
            case PlayActionType.PREVIOUS:
                this.playPrevious();
                break;
            case PlayActionType.NEXT:
                this.playNext();
                break;
            default:
                break;
        }
    }
    private play(): void {
        this.isPlay = true;
        this.startLyricTimer();
        this.notifyStateChanged();
    }
    private pause(): void {
        this.isPlay = false;
        this.stopLyricTimer();
        this.notifyStateChanged();
    }
    private playPrevious(): void {
        this.selectIndex = (this.selectIndex - 1 + DEMO_SONGS.length) % DEMO_SONGS.length;
        this.lyricIndex = 0;
        this.notifyStateChanged();
    }
    private playNext(): void {
        this.selectIndex = (this.selectIndex + 1) % DEMO_SONGS.length;
        this.lyricIndex = 0;
        this.notifyStateChanged();
    }
    // 播放期间模拟音频进度回调：按固定间隔推进歌词行并刷新卡片
    private startLyricTimer(): void {
        if (this.lyricTimer >= 0) {
            return;
        }
        this.lyricTimer = setInterval(() => {
            this.lyricIndex = (this.lyricIndex + 1) % DEMO_LYRICS[this.selectIndex].length;
            this.notifyStateChanged();
        }, LYRIC_TICK_INTERVAL);
    }
    private notifyStateChanged(): void {
        if (this.onPlayStateCall) {
            this.onPlayStateCall({
                isPlay: this.isPlay,
                selectIndex: this.selectIndex,
                songItem: this.getCurrentSong(),
                currentLyric: this.getCurrentLyric()
            });
        }
    }
}
