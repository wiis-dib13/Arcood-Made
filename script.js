let conditionOrder = ["length", "symbol", "noVowels", "caps", "unique"];
let currentStep = 0;
let generatedPassword = "";
let conditionTimeouts = [];

function checkPassword() {
  const password = document.getElementById("password").value;
  const enterBtn = document.getElementById("enterButton");

  const checks = {
    length: password.length === 15,
    symbol: password.length >= 2 && /[^a-zA-Z0-9]/.test(password[0]) && /[^a-zA-Z0-9]/.test(password[password.length - 1]),
    noVowels: !/[aeiouAEIOU]/.test(password),
    caps: (() => {
      const caps = password.match(/[A-Z]/g) || [];
      if (caps.length < 2) return false;
      for (let i = 0; i < password.length - 1; i++) {
        if (password[i].match(/[A-Z]/) && password[i + 1].match(/[A-Z]/)) return false;
      }
      return true;
    })(),
    unique: new Set(password).size === password.length
  };

  conditionTimeouts.forEach(timeout => clearTimeout(timeout));
  conditionTimeouts = [];

  let regressionStep = -1;
  for (let i = 0; i < currentStep; i++) {
    if (!checks[conditionOrder[i]]) {
      regressionStep = i;
      break;
    }
  }

  if (regressionStep !== -1) {
    currentStep = regressionStep;

    conditionOrder.forEach(id => {
      const el = document.getElementById(id);
      el.classList.remove('show');
      el.style.display = 'none';
    });

    const el = document.getElementById(conditionOrder[currentStep]);
    const baseText = el.textContent.replace(/^[❌✅] /, '');
    el.textContent = "❌ " + baseText;
    el.classList.remove('valid');
    el.style.display = 'block';
    setTimeout(() => {
      el.classList.add('show');
    }, 50);

  } else if (currentStep < conditionOrder.length) {
    const currentConditionId = conditionOrder[currentStep];
    const currentEl = document.getElementById(currentConditionId);
    const baseText = currentEl.textContent.replace(/^[❌✅] /, '');

    if (checks[currentConditionId]) {
      currentEl.textContent = "✅ " + baseText;
      currentEl.classList.add('valid');
      currentEl.style.display = 'block';
      currentEl.classList.add('show');

      const timeout = setTimeout(() => {
        currentStep++;
        currentEl.classList.remove('show');
        setTimeout(() => {
          currentEl.style.display = 'none';
          checkPassword();
        }, 300);
      }, 1500);
      conditionTimeouts.push(timeout);
    } else {
      currentEl.textContent = "❌ " + baseText;
      currentEl.classList.remove('valid');
      currentEl.style.display = 'block';
      if (!currentEl.classList.contains('show')) {
        setTimeout(() => {
          currentEl.classList.add('show');
        }, 50);
      }
    }
  }

  const allValid = Object.values(checks).every(Boolean);
  if (allValid && currentStep >= conditionOrder.length) {
    enterBtn.disabled = false;
    enterBtn.classList.add("enabled");

    const successMsg = document.createElement('div');
    successMsg.className = 'condition valid show';
    successMsg.textContent = 'Ready for launch!';
    successMsg.style.display = 'block';
    document.querySelector('.conditions-container').appendChild(successMsg);

    const timeout = setTimeout(() => {
      if (successMsg.parentNode) {
        successMsg.remove();
      }
    }, 1000);
    conditionTimeouts.push(timeout);
  } else {
    enterBtn.disabled = true;
    enterBtn.classList.remove("enabled");
  }
}

function togglePassword() {
  const input = document.getElementById("password");
  const eye = document.getElementById("toggleEye");
  if (input.type === "password") {
    input.type = "text";
    eye.textContent = "🙈";
  } else {
    input.type = "password";
    eye.textContent = "👁️";
  }
}

function enterSpaceship() {}

function generatePassword() {
  const symbols = "!@#$%^&*";
  const upper = "BCDFGHJKLMNPQRSTVWXYZ";
  const lower = "bcdfghjklmnpqrstvwxyz";
  const digits = "1234567890";
  const all = symbols + upper + lower + digits;

  let password = "";
  password += symbols[Math.floor(Math.random() * symbols.length)];

  while (password.length < 14) {
    const char = all[Math.floor(Math.random() * all.length)];
    if (!/[aeiouAEIOU]/.test(char) && !password.includes(char)) {
      password += char;
    }
  }

  password += symbols[Math.floor(Math.random() * symbols.length)];

  let attempts = 0;
  let success = false;

  while (attempts < 100 && !success) {
    let tempPassword = password.split('');

    for (let i = 1; i < tempPassword.length - 1; i++) {
      if (/[A-Z]/.test(tempPassword[i])) {
        tempPassword[i] = lower[Math.floor(Math.random() * lower.length)];
      }
    }

    let idx1 = Math.floor(Math.random() * 11) + 1;
    let idx2;

    do {
      idx2 = Math.floor(Math.random() * 11) + 1;
    } while (Math.abs(idx1 - idx2) <= 1);

    tempPassword[idx1] = upper[Math.floor(Math.random() * upper.length)];
    tempPassword[idx2] = upper[Math.floor(Math.random() * upper.length)];

    password = tempPassword.join('');

    const caps = password.match(/[A-Z]/g) || [];
    let validCaps = caps.length === 2;

    if (validCaps) {
      for (let i = 0; i < password.length - 1; i++) {
        if (password[i].match(/[A-Z]/) && password[i + 1].match(/[A-Z]/)) {
          validCaps = false;
          break;
        }
      }
    }

    const uniqueChars = new Set(password).size === password.length;

    if (validCaps && uniqueChars) {
      success = true;
    }

    attempts++;
  }

  generatedPassword = password;
  showGeneratedPage();
}

function showGeneratedPage() {
  window.location.href = `generated-password.html?pass=${encodeURIComponent(generatedPassword)}`;
}

function backToLogin() {
  location.reload();
}

window.onload = function () {
  setTimeout(() => {
    const firstCondition = document.getElementById(conditionOrder[0]);
    firstCondition.style.display = 'block';
    setTimeout(() => {
      firstCondition.classList.add('show');
    }, 100);
  }, 500);
};
