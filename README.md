# TriviaGame

This is a quiz game. Just hit the right answer within 12 seconds.

If you think you know Marvel Comics well, try~!!!

## Site
https://shirano2.github.io/TriviaGame/


### Technologies Used

* HTML5
* CSS3
* jQuery
* Javascript


#### Set Timer 

```
function timer() {
    intervalId = setInterval(function() {
        $("#timer").text(count+" Seconds");
        count--; 
        if(count<0) {
            timeOver();
        }  
    },1000) ;
}
```

#### Stop Timer

```
function stopTimer() {
    clearInterval(intervalId);
    count=12;
}
```


### Creator
This is made by Minseok Choi (https://github.com/shirano2)
