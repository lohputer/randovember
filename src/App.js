import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/scss/bootstrap.scss';
import "/node_modules/bootstrap/dist/css/bootstrap.css";
import './custom.scss';
import { useState } from 'react';
export default function App() {
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
          <code className="text-center">It was a Thursday when it all happened.</code>
          <p className="col-12 text-center mt-3">Do tick some options.</p> 
          <div className="col-12 text-center form-check">
            <label className="form-check-label">
              <input type="checkbox" className="form-check-input" name="quotations" />
              <strong>Include Quotation Marks</strong>
            </label>
            <br />
            <label className="form-check-label">
              <input type="checkbox" className="form-check-input" name="quotationr" />
              <strong>Remove Quotation Marks</strong>
            </label>
            <br />
            <label className="form-check-label">
              <input type="checkbox" className="form-check-input" name="quotedialogue" />
              <strong>Consider All Quotations Dialogue</strong>
            </label>
            <br />
            <label className="form-check-label">
              <input type="checkbox" className="form-check-input" name="boldc" />
              <strong>Bold Character Titles</strong>
            </label>
            <br />
            <label className="form-check-label">
              <input type="checkbox" className="form-check-input" name="boldd" />
              <strong>Bold Dialogue</strong>
            </label>
            <br />
            <label className="form-check-label">
              <input type="checkbox" className="form-check-input" name="bolds" />
              <strong>Bold Sentences (besides dialogue)</strong>
            </label>
            <br />
          </div>
          <div className="form-group my-3">
            <textarea className="form-control" id="script" rows="3"></textarea>
          </div>
          <button className="btn btn-primary col-10" onClick={()=>{
            let text = document.getElementById("script").value.split("\n");
            let newList = [];
            let cooldown = 0;
            let quote = document.getElementsByName("quotations")[0].checked;
            let boldc = document.getElementsByName("boldc")[0].checked;
            let boldd = document.getElementsByName("boldd")[0].checked;
            let bolds = document.getElementsByName("bolds")[0].checked;
            let quotationr = document.getElementsByName("quotationr")[0].checked;
            let quotedialogue = document.getElementsByName("quotedialogue")[0].checked;
            for (let i=0; i<text.length; i++) {
              if (quotedialogue && (text[i].charAt(0) === `"` || text[i].charAt(0) === `“`)) {
                text[i] = ":" + text[i];
              }
              if (i !== 0) {
                if (!text[i-1].includes(":")) {
                  cooldown += 100*(text[i-1].length);
                } else {
                  cooldown += (100*text[i-1].substring(text[i-1].split(":")[0].length, text[i-1].length).length);
                }
              }
              if (quotationr) {
                text[i] = text[i].replace(`"`, '').replace(`“`, '').replace(`”`, '');
              }
              setTimeout(()=>{
                let character = text[i].substring(0, text[i].split(":")[0].length);
                let dialogue = text[i].substring(text[i].split(":")[0].length, text[i].length);
                if (text[i].includes(":")) {
                  if (boldc) {
                    newList.push(<p className="text-center text-primary"><strong>{character}</strong></p>);
                  } else {
                    newList.push(<p className="text-center text-primary">{character}</p>);
                  }
                  setContent(
                    <>
                      {newList.map((x)=>
                        x
                      )}
                    </>
                  );
                  console.log(newList);
                  let count = 1;
                  newList.push(<p className="text-center"></p>);
                  let diag = "";
                  console.log(newList);
                  let interval1 = setInterval(()=>{
                    diag += dialogue.charAt(count);
                    if (quote) {
                      newList[(2*i)+1] = (<p className="text-center">"{diag}"</p>);
                      if (boldd) {
                        newList[(2*i)+1] = (<p className="text-center"><strong>"{diag}"</strong></p>);
                      }
                    } else {
                      newList[(2*i)+1] = (<p className="text-center">{diag}</p>);
                      if (boldd) {
                        newList[(2*i)+1] = (<p className="text-center"><strong>{diag}</strong></p>);
                      }
                    }
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
                } else {
                  dialogue = text[i];
                  let count = 0;
                  newList.push("");
                  newList.push(<p className="text-primary text-center"></p>);
                  let diag = "";
                  let interval1 = setInterval(()=>{
                    diag += dialogue.charAt(count);
                    if (bolds) {
                      newList[((2*i)+1)] = (<p className="text-primary text-center"><strong>{diag}</strong></p>);
                    } else {
                      newList[((2*i)+1)] = (<p className="text-primary text-center">{diag}</p>);
                    }
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
                  }, 100)
                }
              }, cooldown+(500*i));
            } 
          }}>Submit</button>
        </div>
      : 
        <div className="m-auto p-auto col-10 row">
          <div className="p-2">
            {content}
          </div>
        </div>
      }
    </div>
  );
}