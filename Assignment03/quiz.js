
(function(){
	const questions = [
		{
			q: 'What is your name?',
			options: ['Ram', 'Sita', 'Shyam', 'Mohan'],
			answer: 0
		},
		{
			q: 'Which language runs in a web browser?',
			options: ['Java', 'C', 'Python', 'JavaScript'],
			answer: 3
		},
		{
			q: 'What does CSS stand for?',
			options: ['Cascading Style Sheets', 'Computer Style Sheets', 'Creative Style System', 'Colorful Style Sheets'],
			answer: 0
		}
	];

	let current = 0;
	const userAnswers = new Array(questions.length).fill(null);

	const container = document.querySelector('.contaner');
	const questionEl = container.querySelector('h2');
	const ol = container.querySelector('ol');
	const timerSpan = document.querySelector('#section3 p:nth-of-type(1) span');
	const scoreCur = document.querySelector('#section3 p:nth-of-type(2) span:nth-of-type(1)');
	const scoreTotal = document.querySelector('#section3 p:nth-of-type(2) span:nth-of-type(2)');
	const prevBtn = document.querySelector('#section4 button:first-of-type');
	const nextBtn = document.querySelector('#section4 button:last-of-type');

	scoreTotal.textContent = questions.length;

	function renderQuestion(idx){
		const q = questions[idx];
		questionEl.textContent = `Q. ${q.q}`;
		ol.innerHTML = '';
		q.options.forEach((opt, i) => {
			const li = document.createElement('li');
			li.textContent = opt;
			li.style.padding = '0.6rem 1rem';
			li.style.margin = '0.4rem 0';
			li.style.borderRadius = '0.6rem';
			li.style.listStyle = 'none';
			li.style.background = 'transparent';
			li.style.cursor = 'pointer';
			li.dataset.index = i;

			if (userAnswers[idx] !== null) {
				if (userAnswers[idx] === i) {
					li.style.background = 'rgba(255,255,255,0.16)';
				}
				if (i === q.answer) {
					li.style.outline = '0.12rem solid rgba(0,255,0,0.12)';
				}
			}

			li.addEventListener('click', () => selectOption(idx, i, li));
			ol.appendChild(li);
		});

		prevBtn.disabled = idx === 0;
		nextBtn.textContent = idx === questions.length - 1 ? 'Finish' : 'Next';
	}

	function selectOption(questionIdx, optionIdx, liElement){
		userAnswers[questionIdx] = optionIdx;

		const lis = ol.querySelectorAll('li');
		lis.forEach(l => {
			l.style.background = 'transparent';
			l.style.color = '';
			l.style.opacity = '1';
			l.style.outline = '';
		});

		liElement.style.background = 'rgba(255,255,255,0.16)';

		const correctIdx = questions[questionIdx].answer;
		const correctLi = Array.from(lis).find(x => Number(x.dataset.index) === correctIdx);
		if (correctLi) correctLi.style.outline = '0.12rem solid rgba(0,255,0,0.18)';

		updateScoreDisplay();
	}

	function updateScoreDisplay(){
		const correct = userAnswers.reduce((acc, ans, i) => ans === questions[i].answer ? acc + 1 : acc, 0);
		scoreCur.textContent = correct;
	}

	prevBtn.addEventListener('click', () => {
		if (current > 0) {
			current -= 1;
			renderQuestion(current);
		}
	});

	nextBtn.addEventListener('click', () => {
		if (current < questions.length - 1) {
			current += 1;
			renderQuestion(current);
		} else {
			showResults();
		}
	});

	function showResults(){
		const correct = userAnswers.reduce((acc, ans, i) => ans === questions[i].answer ? acc + 1 : acc, 0);
		container.innerHTML = `\n+      <h2>Quiz Complete</h2>\n+      <p>Your score: <strong>${correct}</strong> / ${questions.length}</p>\n+      <p>Time: <strong>${timerSpan.textContent}</strong></p>\n+      <button id="restart">Restart</button>\n+    `;

		const restart = document.getElementById('restart');
		restart.addEventListener('click', () => location.reload());
	}

	let seconds = 0;
	function pad(n){ return String(n).padStart(2, '0'); }
	function tick(){
		seconds += 1;
		const h = Math.floor(seconds / 3600);
		const m = Math.floor((seconds % 3600) / 60);
		const s = seconds % 60;
		timerSpan.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
	}
	setInterval(tick, 1000);

	renderQuestion(current);
	updateScoreDisplay();
})();

