
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/scss/bootstrap.scss';
import "/node_modules/bootstrap/dist/css/bootstrap.css";
import './custom.scss';
import { useState } from 'react';
function App() {
  const [ content, setContent ] = useState("");
  var day = new Date().getDate();
  return (
    <div className="vh-100 vw-100 d-flex align-items-center justify-content-center">
      {content === "" ? 
        <div className="col-10 p-3 row justify-content-center border border-5 rounded-5 shadow">
          <h1 className="col-12 text-center">Randovember Script Typer</h1>
          <h1 className="col-12 text-center">{new Date().getMonth() === 10 ? `Day ${day}/30` : "It's over already."}</h1>
          <p className="col-12 text-center">Type in whatever script you have here and I will help showcase it :D. Do use a new line and a colon to represent new character dialogue just like this:</p>
          <code className="text-center">NPC 1: Hello.</code>
          <code className="text-center">NPC 2: Hello too.</code>
          <div className="form-group my-3">
            <textarea className="form-control" id="script" rows="3"></textarea>
          </div>
          <button className="btn btn-primary col-10" onClick={()=>{
            let text = document.getElementById("script").value.split("\n");
            let newList = [];
            for (let i=0; i<text.length; i++) {
              let cooldown = 0;
              if (i !== 0) {
                cooldown = 100*text[i].substring(text[i].split(":")[0].length+1, text[i].length).length;
              }
              setTimeout(()=>{
                console.log(newList);
                let character = text[i].substring(0, text[i].split(":")[0].length);
                let dialogue = text[i].substring(text[i].split(":")[0].length+1, text[i].length);
                newList.push(<p className="text-center text-primary">{character}</p>);
                setContent(
                  <>
                    {newList.map((x)=>
                      x
                    )}
                  </>
                );
                console.log(newList);
                let count = 0;
                newList.push(<p className="text-center"></p>);
                let diag = "";
                console.log(newList);
                let interval1 = setInterval(()=>{
                  diag += dialogue.charAt(count);
                  newList[(2*i)+1] = (<p className="text-center">{diag}</p>);
                  setContent(
                    <>
                      {newList.map((x)=>
                        x
                      )}
                    </>
                  );
                  if (count === dialogue.length-1) {
                    clearInterval(interval1);
                  } else {
                    count++;
                  }
                }, 100);
              }, cooldown);
            } 
          }}>Submit</button>
        </div>
      : 
        <div className="m-5 col-10 row justify-content-center">
          {content}
        </div>
      }
    </div>
  );
}

export default App;
