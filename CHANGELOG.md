# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Created By: BENGUERGOURA Oussama & HADJERSI Mohamed | 20/10/2024

## [1.3.5] 

### Added

* Add more props to `ListBox` : [GTS-PRINT#59] (https://quire.io/w/GTS-PRINT31/59)
  - Add prop to display default itme label.
  - Add prop to indicate if default item is selectable or no.
  - Add disabled prop for option to prevent selection of some items.

### Changed

### Deprecated

### Removed
 
### Fixed

 
### Security



## [1.3.4] 

### Added

* Adding set up default value passed by user for listbox.

### Changed

### Deprecated

### Removed
 
### Fixed

* Adding code controlled value for listbox.
 
### Security


## [1.3.3] 

### Added

* Changes in `ButtonComponent`widths :
  - Set the css `width: 100%` for `gts-button` .

### Changed

### Deprecated

### Removed
 
### Fixed

 
### Security

## [1.3.2] 

### Added

### Changed

* Set min-width for context menu item and remove hard width. [GTS-PRINT#57] (https://quire.io/w/GTS-PRINT31/57)

### Deprecated

### Removed
 
### Fixed

* Stopping click propagation when toggle changed in `ToggleComponent` [GTS-PRINT#57] (https://quire.io/w/GTS-PRINT31/57)

### Security

## [1.3.0] 

### Added

* Adding PDF export functionality to `DataTable` component using `jspdf` and `jspdf-autotable`. [GTS-PRINT#56] (https://quire.io/w/GTS-PRINT31/56)
* Adding intelligent sorting support for Dates (DD/MM/YYYY), Numbers, and Alphanumeric strings in `DataTable`.[GTS-PRINT#56] (https://quire.io/w/GTS-PRINT31/56)
* Adding `AutoComplete` component. [GTS-PRINT#55] (https://quire.io/w/GTS-PRINT31/55)
* Adding `isStrictMonth` prop to `CalendarComponent` to support strict month display mode. [GTS-PRINT#43] (https://quire.io/w/GTS-PRINT31/43)
* Adding `ToggleComponent` (Switch) with `noBind` prop for manual control option. [GTS-PRINT#17] (https://quire.io/w/GTS-PRINT31/17)
* Adding column visibility toggling to `DataTable` via "COLUMNS" context menu. [GTS-PRINT#56] (https://quire.io/w/GTS-PRINT31/56)
* Adding "Hide" column option to `DataTable` sorting menu. [GTS-PRINT#56] (https://quire.io/w/GTS-PRINT31/56)

### Changed

* Improved `DataTable` sorting to use header `name` for property lookup. [GTS-PRINT#56] (https://quire.io/w/GTS-PRINT31/56)
* Updated `DataTable` PDF export to include only visible columns. [GTS-PRINT#56] (https://quire.io/w/GTS-PRINT31/56)
* Made `isPaginable`, `isScrollable`, and `paginationConfig` props in `DataTable` optional. [GTS-PRINT#52] (https://quire.io/w/GTS-PRINT31/52)
* Updated `DataTablePagination` `pageLengthTitle` prop type to `String`.
* Updated `CalendarComponent` to adjust header dates when `isStrictMonth` is enabled. [GTS-PRINT#43] (https://quire.io/w/GTS-PRINT31/43)

 
### Deprecated

### Removed
 
### Fixed

* Fixed `ContextMenu` positioning to align correctly with mouse click coordinates. [GTS-PRINT#56] (https://quire.io/w/GTS-PRINT31/56)
* Fixed `sortBy` not being updated when selecting "Sort Desc" in `DataTable` context menu. [GTS-PRINT#54] (https://quire.io/w/GTS-PRINT31/54)

### Security


## [1.1.2] 

### Added
 
### Changed

* Changes in `ButtonComponent`widths :
  - Change `gts-button-container`to take  `min-width: max-content;`.
  - Remove from `gts-button` the css `width: 100%`.
 
### Deprecated

### Removed
 
### Fixed

### Security


## [1.1.0] 

### Added

* Activating sort functions. [GTS-PRINT#52] (https://quire.io/w/GTS-PRINT31/52)
* Adding custom sort function, to activate it you should pass a function named `compare` to table header configuration. [GTS-PRINT#52] (https://quire.io/w/GTS-PRINT31/52)

### Changed

* Enhance pagination configuration: [GTS-PRINT#52] (https://quire.io/w/GTS-PRINT31/52)
  - Adding a defualt pagination if no one is specified and isPagination=true.
  - Add prop to `DataTable` hide/show pagination component.
  - Replace programmed scrollbar by default html scrollbar.
* Replace pure table sorting menu to `ContextMenu`. [GTS-PRINT#52] (https://quire.io/w/GTS-PRINT31/52)

### Deprecated

### Removed

* Remove default margin=50px from `DataTable` component. [GTS-PRINT#52] (https://quire.io/w/GTS-PRINT31/52)

### Fixed

* The `DataTable` display 2 scrollbar. [GTS-PRINT#52] (https://quire.io/w/GTS-PRINT31/52)

### Security



## [1.0.20] 

### Added

### Changed

* `Input` has no default `min-height` now.
* `ButtonComponent`:
    - has default `width: fit-content` to prevent occupating all ligne space.
    - Making content to center.


### Deprecated

### Removed

### Fixed

### Security


## [1.0.18] 

### Added

### Changed

* Add scroll to `BarSide`

### Deprecated

### Removed

### Fixed

* Fix size of date calendar selector.
* Fix `ToolTip` is hided if parent has scroll.

### Security


## [1.0.17] 

### Added

### Changed

* `ButtonComponent` style changed :
  - the className props it's now affected to `gts-button-container`.
  - `ButtonComponent` in flex it's occupate available space.
* Enhance `Accordion` background color.

### Deprecated

### Removed

### Fixed

### Security


## [1.0.13] 

### Added
* adding css className to column in tbale header config [GTS-PRINT#50] (https://quire.io/w/GTS-PRINT31/50)
* Adding `NotificationComponent` to show localy notification and globaly animated notification via `NotificationPlugin` . [GTS-PRINT#48] (https://quire.io/w/GTS-PRINT31/48)
* Adding `ClassName` and `id` to inputs. [GTS-PRINT#49] (https://quire.io/w/GTS-PRINT31/49)
* Adding `disabledFirstBtn` & `disabledLastBtn` props to `ConfirmationDialog`. [GTS-PRINT#46] (https://quire.io/w/GTS-PRINT31/46)
* Adding `disabled` props to `ButtonComponent`. [GTS-PRINT#46] (https://quire.io/w/GTS-PRINT31/46)
* Adding actions props to `PureCalendar`. [GTS-PRINT#8] (https://quire.io/w/GTS-PRINT31/35)
* Adding context menu to `CalendarMonthlyInfo` . [GTS-PRINT#8] (https://quire.io/w/GTS-PRINT31/35)
* Pure coded documentation page was added. [GTS-PRINT#8] (https://quire.io/w/GTS-PRINT31/8)
* Handling today/selectCalendarDate to setup dates display on `CalendarComponent`
* Add calendar icon & today button to `CalendarHeader`  (https://quire.io/w/GTS-PRINT31/35)
* Add the a simple `CalendarComponent` with the minimum of configuration (Show Readme)

### Changed

* Ajustement of `ButtonComponent` hover. [GTS-PRINT#42] (https://quire.io/w/GTS-PRINT31/42)
* The name of `CalendarComponent` is changed to `PureCalendar`.

### Deprecated

### Removed

* The handling of timeslots displaying should be in the projects that use this lib.

### Fixed

* Fixed display table content to left and adding break lines when column is long.  [GTS-PRINT#50] (https://quire.io/w/GTS-PRINT31/50)
* Adding default color to `ListBox`.  [GTS-PRINT#45] (https://quire.io/w/GTS-PRINT31/45)
* content not synchrone with current date selected. 
* switching between months and weeks not coherent.

### Security



## [1.0.6] 

### Added

* Exporting all style directory (colors , fonts , ...) to be used in projects hosts .
* Add `noBind` prop in `CheckBox` to prevent auto toggle on click and juste toggle if `isChecked` changed.  [GTS-PRINT#40] (https://quire.io/w/GTS-PRINT31/40)

### Changed

### Deprecated

### Removed

### Fixed

### Security


## [1.0.4] 

### Added

* Exporting `NoContent` component. [GTS-PRINT#24] (https://quire.io/w/GTS-PRINT31/24)
* Adding `NoContent` component. [GTS-PRINT#24] (https://quire.io/w/GTS-PRINT31/24)

### Changed

### Deprecated

### Removed

### Fixed

* Empty items `ListBox` crashes. [GTS-PRINT#39] (https://quire.io/w/GTS-PRINT31/39)

### Security


## [1.0.0] 

### Added

* Adding `CalendarExample` component. [GTS-PRINT#35] (https://quire.io/w/GTS-PRINT31/35)
* Adding events to `CalendarComponent`. [GTS-PRINT#35] (https://quire.io/w/GTS-PRINT31/35)
* Adding new properties to `CalendarComponent` to make it fully dynamic. [GTS-PRINT#35] (https://quire.io/w/GTS-PRINT31/35)
* Adding `calendarData` props to `CalendarWeekly` & `CalendarMonthly` components. [GTS-PRINT#35] (https://quire.io/w/GTS-PRINT31/35)
* Centralize calendar information in `CalendarComponent` components to pass it to the childs. [GTS-PRINT#35] (https://quire.io/w/GTS-PRINT31/35)
* Adding `ToolTip` component. [GTS-PRINT#38] (https://quire.io/w/GTS-PRINT31/38)
* Adding `ContextMenu` component. [GTS-PRINT#37] (https://quire.io/w/GTS-PRINT31/37)
* Adding `calendars.js` file to handle calendars types constants. [GTS-PRINT#35] (https://quire.io/w/GTS-PRINT31/35)
* Adding `CalendarComponent` component to handle dynamic calendar display. [GTS-PRINT#35] (https://quire.io/w/GTS-PRINT31/35)
* Adding `CalendarHeader` component to handle calendar types display. [GTS-PRINT#35] (https://quire.io/w/GTS-PRINT31/35)
* Adding `CalendarWeeklyInfo` component to handle calendar day information for week display. [GTS-PRINT#35] (https://quire.io/w/GTS-PRINT31/35)
* Adding `past, today, future` css class to handle display. [GTS-PRINT#35] (https://quire.io/w/GTS-PRINT31/35)
* Adding `CalendarMonthlyInfo` component to handle calendar day information for month display. [GTS-PRINT#35] (https://quire.io/w/GTS-PRINT31/35)
* Adding First part of `CalendarMonthly` component. [GTS-PRINT#35] (https://quire.io/w/GTS-PRINT31/35)
* Adding First part of `CalendarWeekly` component. [GTS-PRINT#35] (https://quire.io/w/GTS-PRINT31/35)
* Adding `CardComponent` with test and documentation. [GTS-PRINT#32](https://quire.io/w/GTS-PRINT31/32)
* Adding documentation for `BadgeComponent`. [GTS-PRINT#30](https://quire.io/w/GTS-PRINT31/30)
* Adding `badges.js` file which contain constant badge css theme class [GTS-PRINT#30](https://quire.io/w/GTS-PRINT31/30)
* Adding `BadgeExample` component .[GTS-PRINT#30](https://quire.io/w/GTS-PRINT31/30)
* Adding `BadgeComponent` component .[GTS-PRINT#30](https://quire.io/w/GTS-PRINT31/30)
* Adding selected value to `listBox` component. [GTS-PRINT#33](https://quire.io/w/GTS-PRINT31/33)  
* Adding binding `v-model:isChecked` to bind checkbox value.
* Adding `type` property to `ButtonComponent` component. [GTS-PRINT#66](https://quire.io/w/GTS_Golden_Technology_Solutions/66)
* Adding the possibility to show/hide password input. [GTS-PRINT#25](https://quire.io/w/GTS-PRINT31/25)  
* Adding `maska` library to `TextInput` components. [GTS-PRINT#27](https://quire.io/w/GTS-PRINT31/27) 
* Adding the possibility to specify barside selected item. [GTS-PRINT#29](https://quire.io/w/GTS-PRINT31/29) 
* Adding `AccordionPanel` and `AccordionComponent` components with `README.md`. [GTS-PRINT#19](https://quire.io/w/GTS-PRINT31/19) 
* Adding two-way binding for `value` prop from `TextInput`and `TextInputArea`. [GTS-PRINT#19](https://quire.io/w/GTS-PRINT31/19)
* Adding `DataTablePagiation` component for handling pagination of table.[GTS-PRINT#1](https://quire.io/w/GTS-PRINT31/1)
* Exporting constant buttons file to be used in external projects. [GTS-PRINT#4](https://quire.io/w/GTS-PRINT31/4)
* Adding `CheckBox` component with his tests and documentation. [GTS-PRINT#16](https://quire.io/w/GTS-PRINT31/16)
* Adding `RadioButton`and `RadioGroup` components with his tests and documentation. [GTS-PRINT#15](https://quire.io/w/GTS-PRINT31/15)
* Adding `BasicDialog` and `ConfirmationDialog` with his tests and documentation. [GTS-PRINT#7](https://quire.io/w/GTS-PRINT31/7)
* Adding documentation for `BarSide`, `Input`, `DataTable`. [GTS-PRINT#14](https://quire.io/w/GTS-PRINT31/14)
* Adding `ButtonsComponent` in `index.js` file. [GTS-PRINT#4](https://quire.io/w/GTS-PRINT31/4)
* Adding `Buttons.spec.js` for testing `ButtonComponent` componement. [GTS-PRINT#4](https://quire.io/w/GTS-PRINT31/4)
* Adding buttons desing for all classe in `buttons.js` file[GTS-PRINT#4](https://quire.io/w/GTS-PRINT31/4)
* Adding `buttons.js` file which contain constant button css class [GTS-PRINT#4](https://quire.io/w/GTS-PRINT31/4)
* Adding `ButtonExample` component .[GTS-PRINT#4](https://quire.io/w/GTS-PRINT31/4)
* Adding `ButtonComponent` component .[GTS-PRINT#4](https://quire.io/w/GTS-PRINT31/4)
* Adding borders for inputs when `hover`. [GTS-PRINT#5](https://quire.io/w/GTS-PRINT31/5)
* Adding `ListBox` component. [GTS-PRINT#12](https://quire.io/w/GTS-PRINT31/12)
* Adding tests for `ListBox` component. [GTS-PRINT#12](https://quire.io/w/GTS-PRINT31/12)
* Adding dynamic effect when `BarSideItem` hovred. [GTS-PRINT#5](https://quire.io/w/GTS-PRINT31/5)
* Adding `DataTablePagiation.spec.js` for testing `DataTablePagiation` componement.[GTS-PRINT#1](https://quire.io/w/GTS-PRINT31/1)
* Adding `DataTablePagiation` component for handling pagination of table.[GTS-PRINT#1](https://quire.io/w/GTS-PRINT31/1)
* Adding `DataTable` component for displaying a specific datas and actions.[GTS-PRINT#1](https://quire.io/w/GTS-PRINT31/1)
* Adding `DataTablePagiation.spec.js` fot testing `DataTablePagiation` componement.[GTS-PRINT#1](https://quire.io/w/GTS-PRINT31/1)
* Adding `DataTablePagiation` component for handling pagination of table.[GTS-PRINT#1](https://quire.io/w/GTS-PRINT31/1)
* Adding `DataTable` component for displaying a specific datas and actions.[GTS-PRINT#1](https://quire.io/w/GTS-PRINT31/1)
* Exporting css colors file to be used in external projects. [GTS-PRINT#11](https://quire.io/w/GTS-PRINT31/11)
* Adding `BarSideExemple` page that allows us to generate all possible BarSide component creations. [GTS-PRINT#5](https://quire.io/w/GTS-PRINT31/5)
* Adding `TextInputExemple` page that allows us to generate all possible Input component creations. [GTS-PRINT#5](https://quire.io/w/GTS-PRINT31/5)
* Adding `TextInput` component. [GTS-PRINT#5](https://quire.io/w/GTS-PRINT31/5)
* Adding `TextInputArea` component. [GTS-PRINT#5](https://quire.io/w/GTS-PRINT31/5)
* Adding `TextInput` test suites. [GTS-PRINT#5](https://quire.io/w/GTS-PRINT31/5)
* Adding `BarSide` test suites. [GTS-PRINT#6](https://quire.io/w/GTS-PRINT31/6)
* Creating `BarSide`component with multiple `BarSideMenu` and `BarSideItem`. [GTS-PRINT#2](https://quire.io/w/GTS-PRINT31/2)

### Changed

* Update `CalendarComponent` README file. [GTS-PRINT#35] (https://quire.io/w/GTS-PRINT31/35)
* BarSide `Logo` section now take a component. [GTS-PRINT#28](https://quire.io/w/GTS-PRINT31/28)
* Remove `value` prop from `TextInput`and `TextInputArea`. [GTS-PRINT#19](https://quire.io/w/GTS-PRINT31/19)
* updating `DataTable` style to handle full width [GTS-PRINT#1](https://quire.io/w/GTS-PRINT31/1)
* updating icon type to accept multiple value`[String, Object]` [GTS-PRINT#1](https://quire.io/w/GTS-PRINT31/1)
* updating paginationConfig and move it form `DataTablePagiation` to `DataTable` [GTS-PRINT#1](https://quire.io/w/GTS-PRINT31/1)
* Updating button README file [GTS-PRINT#4](https://quire.io/w/GTS-PRINT31/4)

### Deprecated

### Removed

### Fixed

* `ListBox` value changed does't emit the event.
* Adding scroll to `ListBox` to prevent a Long liste rendering. [GTS-PRINT#18](https://quire.io/w/GTS-PRINT31/18)
* `ListBox` push next item when option displaying. [GTS-PRINT#18](https://quire.io/w/GTS-PRINT31/18)
* Adding `markRaw` to remove vue warn.[GTS-PRINT#1](https://quire.io/w/GTS-PRINT31/1)
* Adding `RadioButton` default checked not working. [GTS-PRINT#15](https://quire.io/w/GTS-PRINT31/15)

### Security


 
