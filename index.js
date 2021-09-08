// Sequential Circuit Binary Multiplier
// TODO: Add validator for MAX of 16-bit length yung multiplier and multiplicand.
// TODO: Input: binary (use minimum number of bits; max up to 16-bit) & check if binary input or not
// TODO: Output: Option to show either step-by-step or “all” mode of the A and Q output after every step with option to output result in TEXT FILE.
// TODO: Writetextfile() is in line 216.

// Initializations

// TODO: For checking -- remove afterwards
// ---------------------------------------------------------------------------------------
//console.log("XX-------------------------------------XX");
//print(negM, M, A, Q, Q1); // TODO: remove this afterwards
//console.log("XX-------------------------------------XX"); // TODO: remove this afterwards
//console.log(); // TODO: remove this afterwards
// ---------------------------------------------------------------------------------------

//program(A, Q, len, tempString);

// This function is used to compute for the sequential binary circuit.
// Parameter: len, the length of the binaries; tempString, concatinated string.
function program(A, Q, Q1, M, negM, len, tempString) {
  $("#SBSdiv").append(
    `<h2>Solution:</h2>
      <div class="SBSgiven container">
        <div class="row">
          <div id="negmdiv" class="gCol col-4 border border-dark">-M: ${negM}</div>
        </div>
        <div class="row">
          <div id="mdiv" class="gCol col-4 border border-dark"> M: ${M}</div>
        </div>
        <div class="row">
          <div id="adiv" class="gCol col border border-dark"> A: ${A}</div>
          <div id="qdiv" class="gCol col border border-dark"> Q: ${Q}</div>
          <div id="q1div" class="gCol col border border-dark"> Q<sub>-1</sub>: ${Q1}</div>
        </div>
      </div>
      <div class="SBSstep container"></div>`
  );
  for (let i = 0; i < len; i++) {
    console.log(i + 1 + ".)");

    tempString = compare(tempString, i, A, M, negM);
    printOutput(A, Q, Q1, len, tempString, i);
    console.log("---------------------------------------");
  }
}

//writeFile(M, A, Q, Q1, negM, tempString);

// TODO: For checking -- remove afterwards
// ---------------------------------------------------------------------------------------
function print(negM, M, A, Q, Q1) {
  console.log("  -M: " + negM);
  console.log("  M: " + M);
  console.log("  A: " + A + "  Q: " + Q + " Q-1: " + Q1);
  return true;
}
// ---------------------------------------------------------------------------------------

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
function getA(M) {
  return padZero(0, M.length);
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
  // console.log("str: " + str + "  |  index: " + index + "  |  char" + char);
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
function compare(tempString, z, A, M, negM, Q, Q1) {
  let _len = tempString.length;

  if (tempString[_len - 2] == "1") {
    // if 1 & 1
    if (tempString[_len - 1] == "1") {
      console.log("Do nothing.");
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
    }
  } else {
    // if 0 & 0
    if (tempString[_len - 1] == "0") {
      console.log("Do nothing.");
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
    }
  }

  console.log(">>" + tempString);
  $(".SBSstep").append(
    `<h4 class="border-top">Pass ${z + 1}:</h4>
    <div class="row">
      <div id="adivAM${
        z + 1
      }" class="gCol col border border-dark"> A: ${tempString.slice(
      0,
      len
    )}</div>
      <div id="qdivAM${
        z + 1
      }" class="gCol col border border-dark"> Q: ${tempString.slice(
      len,
      len + len
    )}</div>
      <div id="q1divAM${
        z + 1
      }" class="gCol col border border-dark"> Q<sub>-1</sub>: ${
      tempString[_len - 1]
    }</div>
    </div>`
  );

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
    } else if (i >= len && i != len) {
      Q = replaceAtIndex(Q, j, tempString[i]);
      j++;
    }
    Q1 = replaceAtIndex(Q1, 0, tempString[tempString.length - 1]);
  }
  console.log("A: " + A + "   Q: " + Q + "M: " + "   Q1: " + Q1);

  $(".SBSstep").append(
    `
    <div class="row">
      <div id="adivSAR${index}" class="gCol col border border-dark"> A: ${A}</div>
      <div id="qdivSAR${index}" class="gCol col border border-dark"> Q: ${Q}</div>
      <div id="q1divSAR${index}" class="gCol col border border-dark"> Q<sub>-1</sub>: ${Q1}</div>
    </div>`
  );
}

// This function is used to write the answer in a text file.
function writeFile(M, A, Q, Q1, negM, tempString) {
  const fs = require("fs");

  // Data which will write in a file.
  let data =
    "Multiplicand: " +
    M +
    "\n  Multiplier: " +
    Q +
    "\n\n-M: " +
    negM +
    "\n M: " +
    M +
    "\t A: " +
    A +
    "\t Q: " +
    Q +
    "\t Q-1: " +
    Q1;

  // Write data in 'Output.txt' .
  fs.writeFile("Output.txt", data, (err) => {
    // In case of a error throw err.
    if (err) throw err;
  });
}