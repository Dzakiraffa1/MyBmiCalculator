document.addEventListener('DOMContentLoaded', function() {
    const calculateButton = document.querySelector('.submit');
    const maleOption = document.querySelector('.gen:first-child p');
    const femaleOption = document.querySelector('.gen:last-child p');
    const genderOptions = document.querySelectorAll('.gen p');
    let selectedGender = '';
    let isLoading = false;

    genderOptions.forEach(option => {
        option.addEventListener('click', function () {
            genderOptions.forEach(opt => {
                opt.style.backgroundColor = '#ffffff';
                opt.style.color = '#000000';
            });

            if (option === maleOption) {
                option.style.backgroundColor = 'blue';
                option.style.color = 'white';
                selectedGender = 'male';
            } else {
                option.style.backgroundColor = '#e30b5c';
                option.style.color = 'white';
                selectedGender = 'female';
            }
        });
    });

    calculateButton.addEventListener('click', function () {
        if (isLoading) return;

        const height = parseFloat(document.querySelectorAll('.hetwet input[type="number"]')[0].value);
        const weight = parseFloat(document.querySelectorAll('.hetwet input[type="number"]')[1].value);
        const age = parseFloat(document.querySelector('.age input[type="number"]').value);

        if (!height || !weight || !age || !selectedGender) {
            showAlert('Please fill all fields and select gender.');
            return;
        }

        showLoading();
        calculateButton.style.display = 'none'; 

        setTimeout(() => {
            const bmiResult = (weight / ((height / 100) ** 2)).toFixed(2);
            let bmiCategory = '';

            if (bmiResult < 18.5) {
                bmiCategory = 'Underweight';
            } else if (bmiResult >= 18.5 && bmiResult < 24.9) {
                bmiCategory = 'Normal';
            } else if (bmiResult >= 25 && bmiResult < 29.9) {
                bmiCategory = 'Overweight';
            } else {
                bmiCategory = 'Obese';
            }

            const resultContainer = document.createElement('div');
            resultContainer.classList.add('result-container');
            resultContainer.innerHTML = `
                <div class="result-box">
                    <h2>BMI RESULT</h2>
                    <p>Your BMI is: ${bmiResult}</p>
                    <p>Category: ${bmiCategory}</p>
                    ${bmiCategory === 'Underweight' ? '<p id="underweight">Underweight: Less than 18.5</p>' : ''}
                    ${bmiCategory === 'Normal' ? '<p id="normal">Normal: 18.5 - 24.9</p>' : ''}
                    ${bmiCategory === 'Overweight' ? '<p id="overweight">Overweight: 25 - 29.9</p>' : ''}
                    ${bmiCategory === 'Obese' ? '<p id="obese">Obese: 30 or greater</p>' : ''}
                    <p>_____________</p>
                    ${bmiCategory === 'Underweight' ? '<p id="underweight">A BMI of 18.5 or less falls below the normal range and means you’re underweight. You may not have the same health risks as people living with obesity, but being underweight could be putting you in other risk categories. Contact your healthcare provider for an evaluation or help getting your nutrition on track.</p>' : ''}
                    ${bmiCategory === 'Normal' ? '<p id="normal">A BMI of 18.5 -24.9 is deemed to be within the ”normal BMI range”. Keeping your weight within this range lowers your risk of getting obesity-related deceases</p>' : ''}
                    ${bmiCategory === 'Overweight' ? '<p id="overweight">A BMI of 25-29.9 means your weight is above the normal range. You may be interested in different ways to lose weight. The goal does not have to focus on body weight alone. If you are experiencing weight-related health complications, losing weight will lower your risk and improve your health.</p>' : ''}
                    ${bmiCategory === 'Obese' ? '<p id="obese">Having a BMI of over 30 places you in the category Obesity. This means that you are at risk of developing obesity-related diseases. Losing weight will reduce the risk of developing obesity-related diseases significantly</p>' : ''}
                    <button class="calculate-again">Calculate Again</button>
                </div>    
            `;
            document.body.appendChild(resultContainer);

            document.querySelector('.container').style.transform = 'translateX(-100%)';

            if (window.innerWidth < 768) { 
                document.querySelector('.container').style.transform = 'none';}
              


            document.querySelector('.calculate-again').addEventListener('click', function() {
                document.body.removeChild(resultContainer);
                document.querySelector('.container').style.transform = 'translateX(0)';
                calculateButton.style.display = 'flex'; 
                isLoading = false;
            });

            hideLoading();
        }, 2000);
    });

    function showLoading() {
        isLoading = true;
        const loadingOverlay = document.createElement('div');
        loadingOverlay.classList.add('loading-overlay');
        loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
        document.body.appendChild(loadingOverlay);
    }

    function hideLoading() {
        const loadingOverlay = document.querySelector('.loading-overlay');
        if (loadingOverlay) {
            document.body.removeChild(loadingOverlay);
        }
        isLoading = false;
    }

    function showAlert(message) {
        const alertBox = document.createElement('div');
        alertBox.classList.add('alert-box');
        alertBox.innerText = message;
        document.body.appendChild(alertBox);

        setTimeout(() => {
            if (alertBox) {
                document.body.removeChild(alertBox);
            }
        }, 3000);
    }
});
