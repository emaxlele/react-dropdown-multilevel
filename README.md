![emaxlele - Making social media a piece of cake](https://static.emaxlele.com/img/logo/logo.svg)
# react-dropdown-multilevel by emaxlele
ReactJS multilevel dropdown component

[📒 STORYBOOK](http://emaxlele.github.io/react-dropdown-multilevel)

[![npm](https://img.shields.io/npm/v/react-dropdown-multilevel?style=plastic)](https://www.npmjs.com/package/react-dropdown-multilevel)
[![NPM](https://img.shields.io/npm/l/react-dropdown-multilevel)](https://github.com/emaxlele/react-dropdown-multilevel/blob/master/LICENSE)
[![NPM](https://img.shields.io/npm/dy/react-dropdown-multilevel?style=plastic)](https://www.npmjs.com/package/react-dropdown-multilevel)

![React multilevel dropdown](https://github.com/emaxlele/react-dropdown-multilevel-master/blob/main/src/lib/images/example.png)

## Install
`npm install react-dropdown-multilevel`

**NPM:** [npmjs.com/package/react-dropdown-multilevel](https://www.npmjs.com/package/react-dropdown-multilevel)

## Development / testing
`npm run storybook`

## Usage / Example
```javascript
import Dropdown from 'react-dropdown-multilevel';
...

<Dropdown
  title='Dropdown title'
>
  <Dropdown.Item
    onClick={() => doSomething()}
  >
    Item 1
  </Dropdown.Item>
  <Dropdown.Item>
    Item 2
    <Dropdown.Submenu>
      <Dropdown.Item>
        Subitem 1
      </Dropdown.Item>
    </Dropdown.Submenu>
  </Dropdown.Item>
</Dropdown>
```

## Docs

### Props
#### Dropdown
| NAME | TYPE | DEFAULT VALUE |
|:-------------|:-------------|:-------------|
|children|ReactNode | ReactNode[]|null|
|title|ReactNode | ReactNode[]|null|
|isDisabled|boolean|false|
|position|"left", "right", "top-right", "top-left"|left|
|buttonVariant|"primary", "secondary", "tertiary", "special", "special-success", "dashed"|secondary|
|isActive|boolean|false|
 |openOnHover|boolean|false|
|wrapperClassName|string|null|
|buttonClassName|string|null|
|menuClassName|string|null|
|onClick|(x?: any) => any|() => null|

#### Item
| NAME | TYPE | DEFAULT VALUE |
|:-------------|:-------------|:-------------|
|children|ReactNode | ReactNode[]|null|
|onClick|(x?: any) => any|() => null|
|isActive|boolean|false|
|className|string|null|
|isDisabled|boolean|false| 

#### Submenu
| NAME | TYPE | DEFAULT VALUE |
|:-------------|:-------------|:-------------|
|children|ReactNode | ReactNode[]|null|
|position|"left", "right", "bottom", "left-top", "right-top"|left|
|className|string|null|
