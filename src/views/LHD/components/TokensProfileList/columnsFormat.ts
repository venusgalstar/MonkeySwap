export const columnWidths = [35, 190, 120, 120, 120, 153, 152, 152, 68]
export const mobileColumnWidths = [35, 130, 75, 75, 60, 80, 80, 80, 47.63]
export const desktopMappedColumns = columnWidths.map((width) => `${width}px`).join(' ')
export const mobileMappedColumns = mobileColumnWidths.map((width) => `${width}px`).join(' ')
