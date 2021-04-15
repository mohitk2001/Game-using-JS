let blackjackGame={
    'you':{'scoreSpan':'#your-blackjack-score','div':'#your-box','score':0 },
    'dealer':{'scoreSpan':'#dealer-blackjack-score','div':'#dealer-box','score':0},
    'card':['2','3','4','5','6','7','8','9','10','J','K','Q','A'],
    'cardsmap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'K':10,'Q':10,'A':[1,11]},
    'hit-turn':true,
    'turn-over':false,
    'player-record':{'win':0,'loss':0,'draw':0}
};
const YOU=blackjackGame['you']
const DEALER=blackjackGame['dealer'];
document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click',blackjackStand);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);


function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve,ms))
}
async function blackjackStand()
{
        blackjackGame['hit-turn']=false;
        while(DEALER['score']<=15)
        {
            
            var botcard=randomNumber();
            showbotcards(DEALER,botcard);
            botscorecard(DEALER,botcard);
            showbotscore(DEALER);
            await sleep(1000);
        }
        
    if(DEALER['score']>15)
    {
        showResult(YOU['score'],DEALER['score']);
    }
}

function showResult(yourscore,dealerscore)
{
    if(yourscore>21 && dealerscore<=21)
    {
        console.log("DEALER won");
        document.querySelector("#black-jack-result").textContent="YOU LOST";
        document.querySelector("#black-jack-result").style.color="red";
        blackjackGame['player-record']['loss']++;
        document.querySelector('#loss').textContent=blackjackGame['player-record']['loss'];
    }
    else if((yourscore === dealerscore) || (yourscore >21 && dealerscore>21))
    {
        console.log('DRAW');
        document.querySelector("#black-jack-result").textContent="DRAW";
        document.querySelector("#black-jack-result").style.color="yellow";
        blackjackGame['player-record']['draw']++;
        document.querySelector('#draw').textContent=blackjackGame['player-record']['draw'];
    }
    else if(yourscore<=21 && dealerscore>21)
    {
        console.log("YOU WON");
        document.querySelector("#black-jack-result").textContent="YOU WON";
        document.querySelector("#black-jack-result").style.color="green";
        blackjackGame['player-record']['win']++;
        document.querySelector('#win').textContent=blackjackGame['player-record']['win'];
    }
    else if(yourscore>dealerscore)
    {
        console.log('YOU WON');
        document.querySelector("#black-jack-result").textContent="YOU WON";
        document.querySelector("#black-jack-result").style.color="green";
        blackjackGame['player-record']['win']++;
        document.querySelector('#win').textContent=blackjackGame['player-record']['win'];
    }
    else if(yourscore<dealerscore)
    {
        console.log("DEALER WON");
        document.querySelector("#black-jack-result").textContent="YOU LOST";
        document.querySelector("#black-jack-result").style.color="red";
        blackjackGame['player-record']['loss']++;
        document.querySelector('#loss').textContent=blackjackGame['player-record']['loss'];
    }
    blackjackGame['turn-over']=true;
}

function showbotscore(DEALER)
{
    if(DEALER['score']>21)
    {
        document.querySelector(DEALER['scoreSpan']).textContent="BUST !!";
        document.querySelector(DEALER['scoreSpan']).style.color="Red";
    }
    else
    {
        document.querySelector(DEALER['scoreSpan']).textContent=DEALER['score'];
    }
}

function botscorecard(botplayer,botcard)
{
    if(botcard==='A')
    {
        if(botplayer['score']+blackjackGame['cardsmap'][botcard][1]<=21)
        {
            botplayer['score']=botplayer['score']+blackjackGame['cardsmap'][botcard][1];
        }
        else
        {
            botplayer['score']=botplayer['score']+blackjackGame['cardsmap'][botcard][0];   
        }
    }
    else
    {
        botplayer['score']=botplayer['score']+blackjackGame['cardsmap'][botcard];
        console.log(blackjackGame['dealer']['score']);
    }
}

function showbotcards(botplayer,botcard)
{
    if(botplayer['score']<=21)
    {
        let compcard=document.createElement('img');
        compcard.src=`${botcard}.png`;
        document.querySelector(botplayer['div']).appendChild(compcard);
    }
}
function blackjackHit()
{
  if(blackjackGame['hit-turn']==true)
  { 
    var randomcard=randomNumber();
    showcards(YOU,randomcard);
    scorecard(YOU,randomcard);
    showscore(YOU);
  }

}
function showcards(activeplayer, randomcard)
{
    if(activeplayer['score']<=21)
    {
        let cardImage=document.createElement('img');
        cardImage.src=`${randomcard}.png`;
        document.querySelector(activeplayer['div']).appendChild(cardImage);
    }
}
function blackjackDeal()
{
    if(blackjackGame['turn-over']==true)
    {
        var yourimages=document.querySelector(YOU['div']).querySelectorAll('img');
        for(let i=0;i<yourimages.length;i++)
        {
            yourimages[i].remove();
        }
        var botimages=document.querySelector(DEALER['div']).querySelectorAll('img');
        for(let j=0;j<botimages.length;j++)
        {
            botimages[j].remove();
        }

        YOU['score']=0;
        DEALER['score']=0;
        document.querySelector('#your-blackjack-score').textContent=0;
        document.querySelector('#your-blackjack-score').style.color="White";
        document.querySelector('#dealer-blackjack-score').textContent=0;
        document.querySelector('#dealer-blackjack-score').style.color="White";
        blackjackGame['hit-turn']=true;


        document.querySelector("#black-jack-result").textContent="LET's PLAY";
        document.querySelector("#black-jack-result").style.color="black";
    }
    blackjackGame['turn-over']=false;
}
function randomNumber()
{
    var Rno=Math.floor(Math.random()*13);
    console.log(blackjackGame['card'][Rno]);
    return blackjackGame['card'][Rno];
}
function scorecard(activeplayer,randomcard)
{
    if(randomcard==='A')
    {
        if(activeplayer['score']+blackjackGame['cardsmap'][randomcard][1]<=21)
        {
            activeplayer['score']=activeplayer['score']+blackjackGame['cardsmap'][randomcard][1];
        }
        else
        {
            activeplayer['score']=activeplayer['score']+blackjackGame['cardsmap'][randomcard][0];
        }
    }
    else
    {
    activeplayer['score']+=blackjackGame['cardsmap'][randomcard];
    }
    
}
function showscore(activeplayer)
{
    if(activeplayer['score']>21)
    {
        document.querySelector(activeplayer['scoreSpan']).textContent="BUST!!";
        document.querySelector(activeplayer['scoreSpan']).style.color="Red";
    }
    else{
    document.querySelector(activeplayer['scoreSpan']).textContent=activeplayer['score'];
    }
}