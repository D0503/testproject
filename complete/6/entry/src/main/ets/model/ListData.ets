export class ListItemData {
  id: number = 0
  name: string = ''
  image: Resource | undefined = undefined
}

export function getListItems(): Array<ListItemData> {
  let items: Array<ListItemData> = []
  let names: string[] =
    ['热门榜单', '精选推荐', '新品首发', '热门话题', '必看合集', '话题广场', '活动中心', '创作者中心', '必看合集', '话题广场', '活动中心', '创作者中心']
  let icons: Resource[] =
    [$r('sys.symbol.compass'), $r('sys.symbol.gamecontroller'), $r('sys.symbol.grid'), $r('sys.symbol.gearshape'),
      $r('sys.symbol.star_fill'), $r('sys.symbol.heart'), $r('sys.symbol.flame'), $r('sys.symbol.paperplane'),
      $r('sys.symbol.star_fill'), $r('sys.symbol.heart'), $r('sys.symbol.flame'), $r('sys.symbol.paperplane')]
  for (let index = 0; index < names.length; index++) {
    let item = new ListItemData()
    item.id = index + 1
    item.name = names[index]
    item.image = icons[index]
    items.push(item)
  }
  return items
}
