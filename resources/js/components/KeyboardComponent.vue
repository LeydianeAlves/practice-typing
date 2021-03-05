<template>
<div class="casing">
    <div class="display">
        <div class="textarea">
            Level: {{ level }} Wrong: {{ wrongAnswersCount }}
            <div class="float"><i class="fas fa-cogs"></i></div>
            <p ref="textarea" :style="textColor">
                {{ keyPressed || "Click here and start typing..." }}
            </p>
            <div ref="exercise" class="exercise">

                <p ref="exercisePTag">
                    Type: <span class="spaced" v-for="char in exercise">{{char}}</span>
                </p>
        </div>
        </div>

    </div>
    <div class="body col-xs-12 ">
        <div class="first-row line">
            <div class="button double-key §-key" ref="§"><span>§</span></div>
            <div class="button double-key one-key" ref="1"><span>1</span></div>
            <div class="button double-key two-key" ref="2"><span>2</span></div>
            <div class="button double-key three-key" ref="3"><span>3</span></div>
            <div class="button double-key four-key" ref="4"><span>4</span></div>
            <div class="button double-key five-key" ref="5"><span>5</span></div>
            <div class="button double-key six-key" ref="6"><span>6</span></div>
            <div class="button double-key seven-key" ref="7"><span>7</span></div>
            <div class="button double-key eight-key" ref="8"><span>8</span></div>
            <div class="button double-key nine-key" ref="9"><span>9</span></div>
            <div class="button double-key zero-key" ref="0"><span>0</span></div>
            <div class="button double-key minus-key" ref="-"><span>-</span></div>
            <div class="button double-key equals-key" ref="="><span>=</span></div>
            <div class="button" style="flex: 0 0 12%;" ref="Backspace">⌫</div>
        </div>
        <div class="second-row line">
            <div class="button" style="flex: 0 0  10%;" ref="Tab">Tab</div>
            <div class="button" ref="q">q</div>
            <div class="button" ref="w">w</div>
            <div class="button" ref="e">e</div>
            <div class="button" ref="r">r</div>
            <div class="button" ref="t">t</div>
            <div class="button" ref="y">y</div>
            <div class="button" ref="u">u</div>
            <div class="button" ref="i">i</div>
            <div class="button" ref="o">o</div>
            <div class="button" ref="p">p</div>
            <div class="button double-key left-bracket-key" ref="["><span>[</span></div>
            <div class="button double-key right-bracket-key" ref="]"><span>]</span></div>
            <div class="button enter-key" ref="enter">enter</div>
        </div>
        <div class="second-row line">
            <div class="button" style="flex: 0 0  12%;" ref="capslock">⇪</div>
            <div class="button" ref="a">a</div>
            <div class="button" ref="s">s</div>
            <div class="button" ref="d">d</div>
            <div class="button bumpy" ref="f">f</div>
            <div class="button" ref="g">g</div>
            <div class="button" ref="h">h</div>
            <div class="button bumpy" ref="j">j</div>
            <div class="button" ref="k">k</div>
            <div class="button" ref="l">l</div>
            <div class="button double-key colon-key" ref=";"><span>;</span></div>
            <div class="button double-key apos-key" ref="'"><span>'</span></div>
            <div class="button double-key backslash-key" ref="\"><span>\</span></div>
            <div class="button" style="flex: 0 0  5%;" ref="enter-extra"> </div>
        </div>
        <div class="third-row line">
            <div class="button" style="flex: 0 0 8%;" ref="ShiftLeft">⇧</div>
            <div class="button" ref="tick">`</div>
            <div class="button" ref="z">z</div>
            <div class="button" ref="x">x</div>
            <div class="button" ref="c">c</div>
            <div class="button" ref="v">v</div>
            <div class="button" ref="b">b</div>
            <div class="button" ref="n">n</div>
            <div class="button" ref="m">m</div>
            <div class="button double-key comma-key" ref=","><span>,</span></div>
            <div class="button double-key dot-key" ref="."><span>.</span></div>
            <div class="button double-key forwardlash-key" ref="/"><span>/</span></div>
            <div class="button" style="flex: 0 0 16%" ref="ShiftRight">⇧</div>
        </div>
        <div class="fourth-row line">
            <div class="button"></div>
            <div class="button"></div>
            <div class="button"></div>
            <div class="button" style="flex: 0 0 9%;"></div>
            <div class="button space-key" style="flex: 0 0 29%;" ref="Spacebar">space</div>
            <div class="button" style="flex: 0 0 9%;"></div>
            <div class="button"></div>
            <div class="button" style="flex: 0 0 21%">← ↕ →</div>
        </div>
        <div class="trackpad">
            <div></div>
        </div>
    </div>
    <div>
        <b-modal ref="modal-1" ok-only title="Well done!">
            <p class="my-4">You have passed!</p>
        </b-modal>
    </div>
</div>
</template>
<script>
import keyCodeValues from '../originalKeyCodes.json';
import disabledKeys from '../disabledKeys.js';
import exercises from '../exercises.js';
import { BModal } from 'bootstrap-vue';

export default {
    components: {
        BModal
    },
    data() {
        return {
            keyPressed: '',
            level: 1,
            pass: false,
            keyCodeValues: keyCodeValues,
            disabledKeys: disabledKeys,
            exercise: [
                'a',
                's',
                'd',
                'f',
                'j',
                'k',
                'l',
                ';',
                " "
            ],
            exercises: exercises,
            textColor: {
                color: 'orange'
            },
            correctAnswer: true,
            cssRules: [],
            wrongAnswersCount: 0
        }
    },
    mounted() {
        this.exercise = this.exercises[this.level];
        this.$nextTick(()=>{
            window.addEventListener('keydown' , (e) => {
                this.activate(e)

                //stop the page from scrolling down on space keydown
                if (e.code == "Space") {
                    e.preventDefault()
                }

                if (e.code == "Backspace"){
                    this.backspace();
                }
                else if (this.disabledKeys.indexOf(e.code) !== -1 || e.key == "Shift") {
                    return;
                } else {
                    this.append(e.key)
                }
                this.checkWork();

            });

            window.addEventListener('keyup' , (e) => {
                this.unactivate(e)
            });
        });
    },
    methods: {
        append(key) {
            this.keyPressed = `${this.keyPressed}${key}`;
        },
        backspace() {
            var exerciseEl = this.$refs.exercisePTag.children
            var lastCharIndex = (this.keyPressed.length -1 );
            var exerciseString = this.exercise.join("");

            console.log(exerciseString.charAt(lastCharIndex));
            console.log(this.keyPressed.charAt(lastCharIndex));

            if (exerciseString.charAt(lastCharIndex) != this.keyPressed.charAt(lastCharIndex)) {
                this.wrongAnswersCount--
            }

            this.keyPressed = this.keyPressed.slice(0, -1);
            exerciseEl[this.keyPressed.length].style.color = "orange";

        },
        activate(key) {
            if (this.disabledKeys.indexOf(key.code) !== -1) return;
            var el = this.handleKeyPress(key);

            if (!this.$refs[el].classList.value.includes("active")) {
                this.$refs[el].classList.value += " active";
            }
        },
        unactivate(key) {
            if (this.disabledKeys.indexOf(key.code) !== -1) return;
            var el = this.handleKeyPress(key);

            if (this.$refs[el].classList.value.includes("active")) {
                this.$refs[el].classList.remove("active")
            }
        },
        getOriginalKey(originalKey) {
            var oKey
            $.each(this.keyCodeValues, function(key, value) {
                if (value == originalKey) oKey = key;
            });
            return oKey;
        },
        handleKeyPress(key) {
            var el = key.key;

            if (el == " ") el = "Spacebar";
            else if (key.code == "ShiftLeft" || key.code == "ShiftRight") el = key.code;

            if (key.shiftKey == true && key.key != "Shift") {
                el = this.getOriginalKey(key.which)
            }

            //include a cool capslock/enter tingie? disabled for now

            return el;
        },
        checkWork() {
            var textChar, exerciseChar;
            var el = this.$refs.exercisePTag.children
            var totalErrors = 0;

            for (var i = 0; i <  this.keyPressed.length; i++) {
                textChar = this.keyPressed.charAt(i);

                for(var x = 0; x < this.exercise.length; x++) {
                    var exerciseChar = this.exercise[x]

                    if (x == i) {

                        if (textChar == exerciseChar && totalErrors == 0) {
                            this.correctAnswer = true;
                            el[x].style.color = "#00ff00";

                        } else {
                            this.correctAnswer = false;
                        }

                        if (textChar != exerciseChar) totalErrors++
                    }
                    //last iteration
                    if (i > x) {
                        this.correctAnswer = false
                    }
                }
            }

            if (this.keyPressed == "" || this.keyPressed == "Start typing...") {
                this.textColor.color = "orange"
            } else if (!this.correctAnswer) {
                this.textColor.color = "red";
            } else {
                this.textColor.color = "#00ff00"
            }
            this.wrongAnswersCount = totalErrors;
            if (this.keyPressed.length == this.exercise.length && this.correctAnswer) this.moveUpLevel(el)
        },
        moveUpLevel(el) {
            this.$refs['modal-1'].show('modal-1')
            //max level limit
            if (this.level <= Object.keys(this.exercises).length) this.level += 1;

            //reset
            this.keyPressed = '';
            this.exercise = this.exercises[this.level];

            for(var x = 0; x < this.exercise.length; x++) {
                el[x].style.color = "orange";
            }
            this.textColor.color = "#black";
            this.wrongAnswersCount = 0;
        }
    }
}
</script>
<style scoped>

.casing {
    margin: 10px;
    position: relative;
}

.body {
    background-color: rgb(121, 119, 119);
    border: 2px solid black;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 5px 0px 0px rgba(94, 85, 85, 0.3),
        0 -1px 0px 0px white,
        15px 0 15px -4px rgba(114, 174, 249, 0.9),
        -15px 0 15px -4px rgba(114, 174, 249, 0.9);
}

.display {
    height: 375px;
    background-color: rgb(121, 119, 119);
    border: 2px solid black;
    border-radius: 5px;
    margin-bottom: 20px
}

.display > div.textarea {
    background-color: black;
    margin: 15px;
    height: 91%;
    border: 2px solid black;
    border-radius: 4px;
    overflow-wrap: break-word;
    padding: 20px;
    color: orange;
}

div.textarea > p {
    font-size: 18px;
    text-align: center;
    margin-top: 30px;
    /* color: #0b8e02; */
}

div.exercise > p {
    font-size: 18px;
    padding-top: 50px;
    color: #ffa500;
    font-weight: bold;
}

span.spaced {
    letter-spacing: 10px;
}

div.display::before, div.display::after {
    content: "|||";
    position: absolute;
    height: 21px;
    width: 33px;
    color: black;
    padding: 0px 11px;
    background-color: darkgray;
    overflow: hidden;
}

div.display::before {
    top: 374px;
    left: 70px;
}

div.display::after {
    top: 374px;
    right: 70px;
}

.trackpad {
    height: 175px;
    background-color: rgb(121, 119, 119);
}

.trackpad > div {
    height: 95%;
    margin: 5px 27%;
    border: 2px solid black;
    border-radius: 5px;
    background-color: rgb(102, 102, 102);
}

.textColor {
    color: #00ff00;
}

.line {
    display: flex;
    flex-wrap: nowrap;
}

.button {
    display: inline-flex;
    padding: 5px;
    margin: 2px;
    background-color: rgb(235 230 239);
    width: 100%;
    border: 1px solid black;
    border-radius: 5px;
    justify-content: center;
}

.button:nth-child(-n+1) {
    background-color:rgb(64, 67, 68);
    color: rgb(158 218 253);
}

.button:last-child {
    background-color: rgb(64, 67, 68);
    color: greenyellow;
}

.active {
    box-shadow: inset 0 0 4px #000000;;
}

.space-key {
    background-color: #ff41a0;
    color: lightcyan;
}

.bumpy::after {
    content: "-";
    position: relative;
    top: 10px;
    right: 5px;
    font-weight: bold;
}

.double-key > span {
    right: 5px;
    position: relative;
    top: 6px;
}

.§-key::before, .one-key::before, .two-key::before, .three-key::before,
.four-key::before, .five-key::before, .six-key::before,
.seven-key::before, .eight-key::before, .nine-key::before,
.ten-key::before, .zero-key::before, .minus-key::before,
.equals-key::before, .left-bracket-key::before, .right-bracket-key::before,
.colon-key::before, .apos-key::before, .backslash-key::before,
.comma-key::before, .dot-key::before, .forwardlash-key::before {
    position: relative;
    bottom: 7px;
    left: 3px;
    font-size: 12px;
}

.§-key::before {
    content: "±";
}

.one-key > span {
    right: 2px;
}

.one-key::before {
    content: "!";
}

.two-key > span {
    right: 6px;
}

.two-key::before {
    content: "@";
    left: 4px;
}

.three-key::before {
    content: "£";
}

.four-key::before {
    content: "$";
}

.five-key::before {
    content: "%";
}

.six-key::before {
    content: "^";
}

.seven-key::before {
    content: "&";
}

.eight-key > span {
    right: 4px;
}

.eight-key::before {
    content: "*";
}

.nine-key > span {
    right: 3px;
}

.nine-key::before {
    content: "(";
}

.zero-key > span {
    right: 3px;
}

.zero-key::before {
    content: ")";
}

.minus-key > span {
    right: 3px;
}

.minus-key::before {
    content: "_";
}

.equals-key > span {
    right: 4px;
}

.equals-key::before {
    content: "+";
    left: 4px;
}

.left-bracket-key > span {
    right: 3px;
}

.left-bracket-key::before {
    content: "{";
    left: 2px;
}

.right-bracket-key > span {
    right: 3px;
}

.right-bracket-key::before {
    content: "}";
    left: 2px;
}


.colon-key > span {
    right: 2px;
}

.colon-key::before {
    content: ":";
    left: 2px;
}

.apos-key > span {
    right: 2px;
}

.apos-key::before {
    content: '"';
    left: 2px;
}

.backslash-key > span {
    right: 2px;
}

.backslash-key::before {
    content: "|";
    left: 2px;
}

.comma-key > span {
    right: 3px;
}

.comma-key::before {
    content: "<";
    left: 2px;
}

.dot-key > span {
    right: 3px;
}

.dot-key::before {
    content: ">";
    left: 2px;
}

.forwardlash-key > span {
    right: 3px;
}

.forwardlash-key::before {
    content: "?";
    left: 2px;
}

</style>
