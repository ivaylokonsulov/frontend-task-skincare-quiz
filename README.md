# FrontEnd Task

## General structure
Each page is made of a React component, with its functionalities, declared inside.
States are preserved at local storage and at each render it is checked if states exist or a default value should be provided.
UI is made as responsive as possible, according to the design in Figma. Additional improvements may be made using SCSS/SASS.
Simple recommendation algorithm is implemented, which basically checks if type of hair or the problem which the user is seeking solution to are present in the title/body/tags of each product. Description of the first recommended product is displayed.
**NOTE** In case recommendations could not be made, all products are listed in the slider.
[React-slick](https://react-slick.neostack.com/) was used to create slider component.
