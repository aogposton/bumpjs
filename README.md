# BumpJS

A library for creating [adult swim] style bumps on websites.


[![Twitter Follow](https://img.shields.io/twitter/follow/amonposton.svg?style=social)](https://twitter.com/amonposton)

---
# 🚀 [Demo](https://immaculateintellect.com/projects/bumpjs)

# ⚙ Installation and Use

## Basic

download files and add manually or add this script tag right before closing `</body>` tag:
```html
  <script src="https://immaculateintellect.com/libraries/bumpjs/dist/bump.min.js"></script>
```

## 🤔 How to use it?
```js
<script>
    const first = {
      options:{fontSize:"5vh"},
      target:'#firstDiv', //target is the selector of where to place the bump. (only class and id selectors work)
      segments: [ // segments is an array containing all of your wording.
        //Segments will be show in index order and must either be
        'This library can create [adult swim] style bumps on websites.', //a segment can be string
        {display:'Its easy to use and flexible.'}, //or an object where the value of the "display" is the content to be displayed 
        'I think its pretty cool',
        'But I was made with BumpJS..',
      ],
    };

    // a block with only the target and display work as well
    const second = {
      target:'#secondDiv',
      display: 'So why wouldnt I like it?' 
    };

    const third = {
      target:'#thirdDiv',
      display: [
        'Is it dark in here or is it just this div?',
      ],
    };

    const fourth = {
      // Options can be added to the root level for global settings these.
      // These settings fallback to color:white, font-size: 5vh.
      target:'#fourthDiv',
      options: {
        fontSize: '10vh',
        color:'#FF99D7',
      },
      segments: [
        { display:'WOW! Much better!', options: {color:'white', fontSize:'5vh'}}, //options can be added to each segment for local settings
        { display:'Now I can show my true colors off!', options: {fontSize:'5vh'}},
        { display:'And can I be honest?', options: {fontSize:'5vh'}},
        { display:'Im actually bigger.'},
        { display:'But I suck it in for <u><i>society</i></u>... ',options: {fontSize:'5vh'}}, // the display string parses as html
      ],
    };

    const fifth = {
      target:'#fifthDiv',
      segments: [
        { percent: 3, display:'hey.'}, // percent tells bumpjs how much of the div to give to this segment. 
        { display:'hey hey.'}, // if percent is not added, bumpjs will calculate how much space is alloted to this segment based on the other segments
        { display:'hey hey hey.'},
        { display:'hey hey hey hey.'},
        { display:'hey hey hey hey hey.'},
        { display:'hey hey hey hey hey hey.'},
        { display:'hey hey hey hey hey hey hey.'},
        { display:'hey hey hey hey hey hey hey hey.'},
        { display:'hey hey hey hey hey hey hey hey hey.'},
        { percent: 3, display:'hey hey hey hey hey hey hey hey hey hey.'},
        { percent: 60, display:'Im bored.'},
        { percent: 7, display:'Lets play hide and seek. <br> Ill hide first and you find me. <br> OK GO!!!!'},
        { percent: 4, display:''}, //added for spacing (to prevent bleed)
      ],
    };

    function found(){
      alert('HOW DID YOU FIND ME???')
    }

    const sixth = {
      target:'#sixthDiv',
      display:'<a id="lost" onclick="found()">[click me]</a>', //javascript functions work inside the html blocks
      options: {
        xOffset:15, 
        yOffset:80,
        fontSize:'10px',
        clickable:true,
      },
    }
    // blocks can be run individually
    // e.g. Bump.init({target:'#someDive', display:'some text'});
    // or in an array;
    Bump.init([
      first,
      second,
      third,
      fourth,
      fifth,
      sixth,
      {
        target:'#seventhDiv',
        display:'<img src="/hwatu4.svg" style="height:10vh"> You win... <img src="/hwatu4.svg" style="height:10vh">',
      },
      {
        target:'#eigthDiv',
        display:'Here is your prize: <br><a href="https://github.com/immaculateintellect/bumpjs">the Github page</a>',
        options:{clickable:true}
      },
      {
        target:'#ninethDiv',
        display:'[BumpJS]',
      },
    ])
</script>
```
##  TODO
- submit to npm
- finish custom classes on segments and bumps