# jquery-dropdown

jquery-dropdown is a simple  jquery dropdown component which can be integrated very easily and provide as much as option required. Any missing feature info will be appreciated.

## Demo

Check example directory for examples.

![Alt Text](https://drive.google.com/file/d/1YXVntS-JEPwjgWR9Mu01t6Gyqh5Cwb-V/view?usp=sharing)

## Getting Started

You have to add "jquery-dropdown.js" and "jquery-dropdown.css" into your project. You can either download it directly or get using npm.

```
<link rel="stylesheet" href="./jquery-dropdown.css">
<script type="text/javascript" src="./jquery-dropdown.js"></script>
```

Import Using NPM:
```
npm install jquery-dropdown --save
```


### Usage

After adding jquery-dropdown into your project, just add below code into your project.

```
$("#dropdown").dropdown({
    data : [
        {
            id : 0,
            name : "Alaska"
        },
        {
            id : 1,
            name : "florida"
        },
        {
            id : 2,
            name : "New York"
        },
        {
            id : 3,
            name : "Ohio"
        }
    ],
    onOptionSelect : function(item){
        console.log(item);
    }
});
```
## Options List

| OPtion | Required/Optional | Description |
| --- | --- | --- |
| `data` | Required | Data that needs to be render |
| `placeholder` | Optional | Custom Placeholder for dropdown |
| `searchPlaceholder` | Optional | Custom search Placeholder |
| `className` | Optional | Custom classname to container |
| `search` | Optional | Enable Search control, disabled by default |
| `disable` | Optional | Disable dropdown |

### data Object options

| OPtion | Required/Optional | Description |
| --- | --- | --- |
| `id` | Required & Unique | Unique id for each list item |
| `name` | Required | displayName of list item |

### Events

| OPtion | Required/Optional | Description |
| --- | --- | --- |
| `onOptionSelect` | Required | Will be triggered on selecting option from dropdown list|

## upcoming Featres
1. Add multiple themes [Default, Bootstrap,Flat UI & Material].
2. Add onOpen, onClose & onToggle event.
3. Adding different positioning option.


## Authors

***Sahil Gupta** [Github](https://github.com/techhysahil)

## License

This project is licensed under the Custom License - see the [LICENSE.md](LICENSE.md) file for details.
