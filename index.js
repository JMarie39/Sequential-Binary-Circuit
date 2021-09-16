// Sequential Circuit Binary Multiplier

// This function is used to compute for the sequential binary circuit.
// Parameter: len, the length of the binaries; tempString, concatinated string.
function program(A, Q, Q1, M, negM, len, tempString) {
  $("#SBSdiv").append(
    `<h2>Solution:</h2>
      <div class="SBSgiven container">
        <div class="row">
          <div id="negmdiv" class="gCol col-3 border border-dark">-M: ${negM}</div>
        </div>
        <div class="row">
          <div id="mdiv" class="gCol col-3 border border-dark"> M: ${M}</div>
        </div>
        <div class="row">
          <div id="adiv" class="gCol col-3 border border-dark"> A: ${A}</div>
          <div id="qdiv" class="gCol col-3 border border-dark"> Q: ${Q}</div>
          <div id="q1div" class="gCol col-3 border border-dark"> Q<sub>-1</sub>: ${Q1}</div>
        </div>
      </div>
      <div class="SBSstep container"></div>`
  );
  for (let i = 0; i < len; i++) {
    console.log(i + 1 + ".)");
    tempString = compare(tempString, i, A, M, negM, Q, Q1, len);
    printOutput(A, Q, Q1, len, tempString, i);
    $("#adivSAR" + len).css("color", "#008000");
    $("#qdivSAR" + len).css("color", "#008000");
  }
  $("#txtbutton").show();
}

// This function checks the length of the multiplicand and multiplier.
// Otherwise, adjust it so that it will have the same length.
// Returns: length of the binary.
function checkLength(M, Q) {
  let lenM = M.length;
  let lenQ = Q.length;

  if (lenM != lenQ) {
    if (lenM < lenQ) {
      if (M[0] == "0") {
        M = padZero(M, lenQ);
      } else {
        M = padOne(M, lenQ);
      }
    } else {
      if (Q[0] == "0") {
        Q = padZero(Q, lenM);
      } else {
        Q = padOne(Q, lenM);
      }
    }
  }
  return lenM > lenQ ? lenM : lenQ;
}

// This function is used to get A (zeros)
// Parameter: M, the multiplicand.
// Returns: The padded zeros with the same length as M & Q.
function getA(x) {
  return padZero(0, x);
}

// This function is used to pad zeros.
// Parameter: num, the number to be padded; length to be padded.
// Returns: padded zeros.
function padZero(num, digits) {
  let temp = parseInt(num);
  return Array(Math.max(digits - String(temp).length + 1, 0)).join(0) + temp;
}

// This function is used to pad ones.
// Parameter: num, the number to be padded; length to be padded.
// Returns: padded ones.
function padOne(num, digits) {
  return Array(Math.max(digits - String(num).length + 1, 0)).join(1) + num;
}

// This function is used to replace a certain character in the string.
// Parameter: str, string; index to be replaced, character to be replaced.
// Returns: updated string.
function replaceAtIndex(str, index, char) {
  if (index > str.length - 1) {
    return str;
  } else {
    cnt = 0;
    flag = 0;

    x = str.substring(0, index) + char + str.substring(index + 1);

    for (i = 0; i < x.length; i++) {
      if (x[i] == "2") {
        x = x.substring(0, i) + "0" + x.substring(i + 1);
        i = x.length;
        flag = 1;
      } else cnt++;
    }

    if (flag == 1) {
      for (i = cnt - 1; i >= 0; i--) {
        if (x[i] == "1") x = x.substring(0, i) + "0" + x.substring(i + 1);
        else if (x[i] == "0") {
          x = x.substring(0, i) + "1" + x.substring(i + 1);
          i = 0;
        }
      }
    }
    return x;
  }
}

// This function is used to get the 2's complement of M.
// Parameter: M, the multiplicand.
// Returns: M.
function get2sComplement(M) {
  let lenM = M.length;
  let isOne = true;

  for (var i = lenM - 1; i > -1; i--) {
    let temp = parseInt(M.charAt(i));

    if (!isOne) {
      M = replaceAtIndex(M, i, (1 - temp).toString());
    }

    if (temp == 1) {
      isOne = false;
    }
  }
  return M;
}

// This function checks the last digit of Q and Q-1
// Parameter: tempString, the concatinated string.
// Returns: tempString.
function compare(tempString, z, A, M, negM, Q, Q1, len) {
  let _len = tempString.length;
  let textAM = "";

  if (tempString[_len - 2] == "1") {
    // if 1 & 1
    if (tempString[_len - 1] == "1") {
      console.log("Do nothing.");
      textAM = "Do nothing.";
    }
    // if 1 & 0
    else {
      console.log("A-M");
      for (let i = 0; i < A.length; i++) {
        tempString = replaceAtIndex(
          tempString,
          i,
          (parseInt(tempString[i]) + parseInt(negM[i])).toString()
        );
      }
      textAM = "A-M";
    }
  } else {
    // if 0 & 0
    if (tempString[_len - 1] == "0") {
      console.log("Do nothing.");
      textAM = "Do nothing.";
    }
    // if 0 & 1
    else {
      console.log("A+M");
      for (let i = 0; i < A.length; i++) {
        tempString = replaceAtIndex(
          tempString,
          i,
          (parseInt(tempString[i]) + parseInt(M[i])).toString()
        );
      }
      textAM = "A+M";
    }
  }
  console.log(">>>>>>>>>>" + len);
  console.log(">>" + tempString);
  $(".SBSstep").append(
    `<h4 id="pass${z + 1}" class="border-top">Step ${z + 1}:</h4>
    <div class="row">
      <div id="adivAM${
        z + 1
      }" class="gCol col-3 border border-dark"> A: ${tempString.slice(
      0,
      len
    )}</div>
      <div id="qdivAM${
        z + 1
      }" class="gCol col-3 border border-dark"> Q: ${tempString.slice(
      len,
      len + len
    )}</div>
      <div id="q1divAM${
        z + 1
      }" class="gCol col-3 border border-dark"> Q<sub>-1</sub>: ${
      tempString[_len - 1]
    }</div>
    <div id="divAM${
      z + 1
    }" class="gCol col-3 border border-dark">${textAM}</div>
    </div>`
  );
  $("#nxtbutton").show();
  return SAR(tempString);
}

// This function pertains to shift arithmetic right.
// Parameter: tempString, the concatinated string.
// Returns: tempString.
function SAR(tempString) {
  tempString = tempString[0].concat(tempString);
  tempString = tempString.slice(0, -1);

  return tempString;
}

// This function is used to print the outputs A and Q.
// Parameter: A, Q, len, tempString.
function printOutput(A, Q, Q1, len, tempString, ind) {
  let index = ind + 1;
  let j = 0;

  for (let i = 0; i < 2 * len; i++) {
    if (i < len) {
      A = replaceAtIndex(A, i, tempString[i]);
    } else {
      Q = replaceAtIndex(Q, j, tempString[i]);
      j++;
    }
  }
  Q1 = replaceAtIndex(Q1, 0, tempString[tempString.length - 1]);
  console.log("A: " + A + "   Q: " + Q + "M: " + "   Q1: " + Q1);

  $(".SBSstep").append(
    `
    <div class="row">
      <div id="adivSAR${index}" class="gCol col-3 border border-dark"> A: ${A}</div>
      <div id="qdivSAR${index}" class="gCol col-3 border border-dark"> Q: ${Q}</div>
      <div id="q1divSAR${index}" class="gCol col-3 border border-dark"> Q<sub>-1</sub>: ${Q1}</div>
      <div id="divSAR${index}" class="gCol col-3 border border-dark">SAR</div>
    </div>`
  );
}

function clearALL() {
  $("#nxtbutton").hide();
  $("#errormsg").hide();
  $("#txtbutton").hide();
  $("#SBSdiv").empty();
}
