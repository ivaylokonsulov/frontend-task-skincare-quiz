# FrontEnd Task

## General structure
1. Each page is made of a React component, with its functionalities, declared inside.
2. States are preserved at local storage and at each render it is checked if states exist or a default value should be provided.
3. UI is made as responsive as possible, according to the design in Figma. Additional improvements may be made using SCSS/SASS.
4. Simple recommendation algorithm is implemented, which basically checks if type of hair or the problem which the user is seeking solution to are present in the title/body/tags of each product. Description of the first recommended product is displayed.
   
<em>In case recommendations could not be made, all products are listed in the slider.</em>

6. [React-slick](https://react-slick.neostack.com/) was used to create slider component.
