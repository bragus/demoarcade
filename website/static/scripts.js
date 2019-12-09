$(document).ready(function(){
});

loadHighScores();
  
let highScoreMin;

function loadHighScores() {
      $.ajax({
          type: "GET",
          dataType: 'json',
          url: "/static/test.json",
          success: (data) => {
      let scoreLog = `<p class="score-title"><u>High Scores:</u></p>`;
      highScoreMin = data[10].score;
              for(var i = 0; i <= 10; i++){
                  scoreLog += `<p>${data[i].name.slice(0, 7)}: ${data[i].score}</p>`;
              }
              $('.highScores').html(scoreLog);
          },
          error: (xhr, status, err) => {
              console.log(err);
          }
      });
}

