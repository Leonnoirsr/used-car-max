
# Code Style and Best Practices

### *Code Practices To Follow*:






### Appendix



    
#### File Structure

---



###### _**Imports**_. 

.

 Because React 18 no longer requires the top level react import, importing React from 'react' is no longer necessary. However, if we're coding in React on Typescript we follow the functional component or FC approach.  So Our import statement will at least have that at the top level. Like so:  



``` import { FC }           from 'react'; ```

.
---
Imports should be grouped in the following order:

            1. Named Imports first
            2. Followed by default imports

---
**NOTE**: When importing, organize imports by length to give a more uniform look. See screenshot below for reference.

![Import Screenshot](https://snipboard.io/6ye1ln.jpg)


---

_**Functions and Classes**_

Make sure to put a space of padding between the opening curly and closing curly brace by hitting the enter button twice to give the content in the middle a little room. Follow this for Classes, Functions, Conditionals, Types, Interfaces and anything that uses curly braces.

![Padding Screenshot](https://snipboard.io/jnlCQ8.jpg)

---

_**Variable names and assignments**_

Where possible, group variables in a way that allows for uniformity and cohesiveness. For const declarations and let declarations, use commas where possible to group variables together. Align "=" signs and variable assignments. If possible also align colons ":"

---

![Variable grouping Screenshot 1](https://snipboard.io/8MGLuA.jpg)

---

![Variable grouping Screenshot 2](https://snipboard.io/UIJMyc.jpg)
---

![Variable grouping Screenshot 3](https://snipboard.io/03fC4s.jpg)


---

_**JSX Elements and Attributes**_

For JSX elements that have up to 2 attribute, keep everything on one line inline. 

---

![Inline Element Attribute](https://snipboard.io/gSiZN0.jpg)

---


For elements that have more than 2 attributes, put each attribute on a new line to make for more readability.

---

![MultiLine Element Attribute](https://snipboard.io/56rTZC.jpg)

---

Close elements on the same line as the last attribute.


###### _**Interfaces**_

Use interfaces over types where possible.