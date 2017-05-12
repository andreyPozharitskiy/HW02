`use strict`

const DOSTOINSTVO=[1,2,3,4,5,6,7,8,9];
const MAST=[`c`,`b`,`k`,`p`];
let trump;

let Card = {
  d:null,
  m:null,
  setCard:function (d,m) {
      this.d=d;
      this.m=m;
  }

};

let Koloda = {
    cards:[],

    setCards:function(){
        "use strict";
        for (let i=0;i<DOSTOINSTVO.length;i++){
            for (let j=0;j<MAST.length;j++){
                this.cards.push(new Card.setCard(DOSTOINSTVO[i],MAST[j]));
            }
        }
    },

    shuf:function () {
        function Rand(a, b) {
            return Math.random() - 0.5;
        }
        this.cards.sort(Rand);
    },

    deal:function (...hands) {
        while (this.cards.length!=0){
            for (let i=0;i<hands.length;i++){
                if (this.cards.length!=0){
                    hands[i].cards.push(this.cards.pop());
                }

            }
        }
    },

    setTrump: function(m) {
        let rand = Math.random() * 4;
        rand = Math.floor(rand);
        return m[rand];
    }

};

let Hand = {
    cards:[],
    score:0,
    name:`Петя`
};

let Hand2 = {
    cards:[],
    score:0,
    name:`Вася`
};

Koloda.setCards();
Koloda.shuf();
Koloda.deal(Hand,Hand2);
trump=Koloda.setTrump(MAST);

function createVisual(t,sp,sv,win) {
    let tr;

    if (t=='k'){
        tr=`Крести`;
    }else if (t==`b`){
        tr=`Буба`;
    }else if (t==`c`){
        tr=`Чирвы`;
    }else if (t==`p`){
        tr=`Пика`;
    };

    let html = `
        <table align="center" style="font-size: xx-large">
            <tr>
                <td>Козырь:</td>
                <td>${tr}</td>
            </tr>
            <tr>
                <td>Петя:</td>
                <td>${sp} очков</td>
            </tr>
            <tr>
                <td>Вася:</td>
                <td>${sv} очков</td>
            </tr>
            <tr>
                <td>Победитель:</td>
                <td>${win}</td>
            </tr>
        </table>`

    document.write(html);
}

function theGame(h1,h2){
    "use strict";
    let winner;
    for (let i=0;i<18;i++){
        if ((h1.cards[h1.cards.length-1].m!=trump)&&(h1.cards[h2.cards.length-1].m!=trump)){
            if ((h1.cards.pop().d)>(h2.cards.pop().d)){
                h1.score++;
            }else{
                h2.score++;
            };
        }else if ((h1.cards[h1.cards.length-1].m==trump)&&(h1.cards[h2.cards.length-1].m!=trump)){
            h1.score++;
        }else if ((h1.cards[h1.cards.length-1].m!=trump)&&(h1.cards[h2.cards.length-1].m==trump)){
            h2.score++;
        }else if ((h1.cards[h1.cards.length-1].m==trump)&&(h1.cards[h2.cards.length-1].m==trump)){
            if ((h1.cards.pop().d)>(h2.cards.pop().d)){
                h1.score++;
            }else{
                h2.score++;
            };
        };

    };
    if (h1.score>h2.score){
        winner=h1.name;
    }else if (h1.score==h2.score){
        winner=`Ничья`;
    }else{
        winner=h2.name;
    };

    createVisual(trump,h1.score,h2.score,winner);
};

theGame(Hand,Hand2);

