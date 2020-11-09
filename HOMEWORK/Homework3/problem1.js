// ============================================================================================= \\
function isLeapYear()
{
    var year = document.getElementById("year").value; //gets the id "year" from the input field
    var add_output = document.getElementById("result").value; //gets the id "result" from the textarea
    //document.getElementById("result").value --> will output the string to the textarea
    if(year.length < 4 || year.length == 0)
    {
        document.getElementById("result").value = add_output + "THE ENTRY IS INVALID\n";
    }
    else if(year%400==0){
        document.getElementById("result").value = add_output + year + " is a leap year.\n";
    }
    else if(year%100==0){
        document.getElementById("result").value = add_output + year + " is not a leap year.\n";
    }
    else if(year%4==0){
        document.getElementById("result").value = add_output + year + " is a leap year.\n";
    }
    else {
        document.getElementById("result").value = add_output + year + " is not a leap year.\n";
    }
}
// ============================================================================================= \\
function validateCardNumber()
{
    // --------------------------------------------\\
    var with_dashes = document.getElementById("with_dashes").value; //gets the id "with_dashes" from the input field
    var no_dashes = "";
    for (var i = 0; i < with_dashes.length; i++) {
        if (with_dashes[i] !== '-') {
            no_dashes += with_dashes[i];
        }
    }
    var sum = 0;
    for(var i = 0; i < no_dashes.length; i++) { 
        sum += parseInt(no_dashes[i]);  
    }
    // --------------------------------------------\\
    function differentDigits(num) {
        var digit = {};
        for (var i = 0; i < no_dashes.length; i++) {
            digit[no_dashes[i]] = true;
        }
        if (Object.keys(digit).length < 2) {
            return false;
        }
    }
    // --------------------------------------------\\
    function finalEven(num) {
        if (no_dashes[no_dashes.length - 1] % 2 !== 0) {
            return false;
        }
    }
    // --------------------------------------------\\
    function allNumbers(num) {
        for (var i = 0; i < no_dashes.length; i++) {
            var with_dashes = no_dashes[i];
            with_dashes = Number.parseInt(with_dashes);
            if (!Number.isInteger(with_dashes)) {
                return false;
            }
        }
    }
    // --------------------------------------------\\
    document.getElementById("validity").style.color = "red"; //makes the text in the textarea with id "validity" red
    document.getElementById("comment").style.color = "red"; //makes the text in the textarea with id "comment" red
    document.getElementById("validity").innerText = "Card number " + with_dashes + " is invalid.\n";
    //document.getElementById("validity").innerText --> is used to output a string in the textarea "validity"
    //document.getElementById("comment").innerText --> is used to output a string in the textarea "comment"
    if(no_dashes.length == 0){
        document.getElementById("comment").innerText = "Please input a card number.";
    }
    else if(differentDigits(no_dashes)==false){
        document.getElementById("comment").innerText = "You must have at least two different digits.";
    } 
    else if(no_dashes.length != 16){
        document.getElementById("comment").innerText = "Number must be composed of 16 digits."
    }
    else if(finalEven(no_dashes)==false){
        document.getElementById("comment").innerText = "The final digit must be even." 
    }
    else if(sum < 16){
        document.getElementById("comment").innerText = "Sum is less than 16."
    } 
    else if(allNumbers(no_dashes)==false){
        document.getElementById("comment").innerText = "Invalid characters."
    }
    else {
        document.getElementById("validity").style.color = "green"; //makes the text in the textarea with id "validity" green
        document.getElementById("comment").style.color = "green"; //makes the text in the textarea with id "comment" green
        document.getElementById("validity").innerText = "Card number " + with_dashes + " is valid.";
        document.getElementById("comment").innerText = "Meets all requirements.";
    }
    // --------------------------------------------\\
}
// ============================================================================================= \\
function calculate(){
    //initializes all the variables that will later be inputed by the user
    let asst, proj, quiz, attend = 0;
    let asst_average = 0;
    let quiz_average = 0;
    let course_average = 0;
    
    proj = Number(document.getElementById("proj").value); //gets the id "proj", which is a number
    attend = Number(document.getElementById("attend").value); //gets the id "attend", which is a number
    // --------------------------------------------\\
    quiz = document.getElementById("quiz").value; //gets the id "quiz" from the input field
    asst = document.getElementById("asst").value; //gets the id "asst" from the input field
    // --------------------------------------------\\
    //we need to have between 4 to 6 asst inputs, so we need to first split them from each other 
    var asst_split = asst.split(" "); //seperates the asst inputs based on space
    if (asst_split.length != 4 && asst_split.length != 5 && asst_split.length != 6) {
        document.getElementById("asst_average").value = "Input between 4 and 6 assignments.";
    }
    else{
        //each iteration adds a single asst grade to the overall asst average
        //asst_split.length --> is the number of asst inputs (has to be between 4 and 6)
        for(var i = 0; i < asst_split.length; i++) { 
            asst_average += Number(asst_split[i]); 
        }
        asst_average = asst_average/asst_split.length;
        document.getElementById("asst_average").value = asst_average; //ouputs the asst average in the area with id "asst_average"
    }
    // --------------------------------------------\\
    //we need to have exactly 3 quizzes
    var quiz_split = quiz.split(" "); //seperates the quiz inputs based on space
    if (quiz_split.length != 3){
        document.getElementById("quiz_average").value = "Input exactly 3 quizzes.";
    } 
    else{
        //each iteration adds a single quiz grade to the overall quiz average
        //quiz_split.length --> is the number of quiz inputs (has to be exaclty 3)
        for(var i = 0; i < quiz_split.length; i++) { 
            quiz_average += Number(quiz_split[i]);  
        }
        quiz_average = quiz_average/quiz_split.length;
        document.getElementById("quiz_average").value = quiz_average; //ouputs the quiz average in the area with id "quiz_average"
    }
    // --------------------------------------------\\
    course_average = (asst_average + proj + quiz_average + attend)/4;
    document.getElementById("course_average").value = course_average;
    document.getElementById('raised_average').value = Math.round(course_average); //rounds course_average
    // --------------------------------------------\\
    //we need exactly 3 quizez, each quiz has a respective weight
    let quiz1, quiz2, final = 0;
    quiz1 = Number(quiz_split[0]); //first quiz input
    quiz2 = Number(quiz_split[1]); //second quiz input
    final = Number(quiz_split[2]); //third quiz input
    // --------------------------------------------\\
    var weighted_grade = ((0.1*asst_average)+(0.15*proj)+(0.15*quiz1)+(0.25*quiz2)+(0.3*final)+(0.05*attend));
    document.getElementById('weighted_grade').value = weighted_grade; //ouputs the weighted grade in the area with id "weighted_grade"
    // --------------------------------------------\\
}
// ============================================================================================= \\