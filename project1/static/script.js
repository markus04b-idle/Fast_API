const primaryBtn = document.getElementById('get-number-btn');
const num1Display = document.getElementById('num1');
const num2Display = document.getElementById('num2');
const answerInput = document.getElementById('answer-input');
const checkBtn = document.getElementById('check-btn');
const answerSection = document.getElementById('answer-section');
const resultText = document.getElementById('result-text');
const loadingText = document.getElementById('loading-text');

let currentNum1 = 0;
let currentNum2 = 0;

primaryBtn.addEventListener('click', loadNewProblem);
checkBtn.addEventListener('click', checkAnswer);
answerInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});

async function loadNewProblem() {
    primaryBtn.disabled = true;
    loadingText.style.display = 'block';
    resultText.style.display = 'none';
    answerSection.style.display = 'none';
    
    try {
        const response = await fetch('/randint');
        const data = await response.json();
        
        currentNum1 = data.n1;
        currentNum2 = data.n2;
        
        num1Display.textContent = currentNum1;
        num2Display.textContent = currentNum2;
        
        answerInput.value = '';
        answerSection.style.display = 'block';
        answerInput.focus();
    } catch (error) {
        console.error('Error fetching problem:', error);
        num1Display.textContent = '?';
        num2Display.textContent = '?';
        alert('Oops! Something went wrong. Please try again.');
    } finally {
        primaryBtn.disabled = false;
        loadingText.style.display = 'none';
    }
}

function checkAnswer() {
    const userAnswer = parseInt(answerInput.value);
    const correctAnswer = currentNum1 * currentNum2;
    
    resultText.style.display = 'block';
    
    if (userAnswer === correctAnswer) {
        resultText.textContent = '✓ Correct! Well done! 🎉';
        resultText.classList.remove('incorrect');
        resultText.classList.add('correct');
    } else {
        resultText.textContent = `✗ Not quite. The answer is ${correctAnswer}. Try again!`;
        resultText.classList.remove('correct');
        resultText.classList.add('incorrect');
        answerInput.select();
    }
}

// Load a problem when the page first loads
window.addEventListener('load', loadNewProblem);
