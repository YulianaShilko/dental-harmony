// form-handler-dynamic.js
// Расширенная версия с поддержкой динамических имен врачей

(function() {
    // Функция для установки сообщения в форму
    function setDoctorAppointment(doctorName) {
        const form = document.getElementById('form01-6');
        if (!form) {
            console.error('Форма не найдена');
            return false;
        }
        
        const messageField = form.querySelector('textarea[name="message"]');
        if (!messageField) {
            console.error('Поле message не найдено');
            return false;
        }
        
        // Устанавливаем сообщение
        messageField.value = `Записаться на прием к ${doctorName}`;
        
        // Подсвечиваем поле
        messageField.style.backgroundColor = '#fff9c4';
        messageField.style.transition = 'background-color 0.5s ease';
        setTimeout(() => {
            messageField.style.backgroundColor = '';
        }, 1500);
        
        // Скроллим к форме
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        return true;
    }
    
    // Функция для инициализации всех кнопок с классом appointment-btn
    function initAppointmentButtons() {
        // Находим все кнопки с data-атрибутом doctor-name
        const buttons = document.querySelectorAll('.appointment-btn, a.btn.btn-md.btn-secondary.display-4[href*="form01-6"]');
        
        buttons.forEach(button => {
            // Получаем имя врача из атрибута data-doctor-name
            let doctorName = button.getAttribute('data-doctor-name');
            
            // Если атрибута нет, берем текст из data-doctor или используем стандартный
            if (!doctorName) {
                doctorName = button.getAttribute('data-doctor') || 'врачу';
            }
            
            // Удаляем старый обработчик
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // Добавляем новый обработчик
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                setDoctorAppointment(doctorName);
            });
        });
    }
    
    // Экспортируем функции в глобальную область
    window.setDoctorAppointment = setDoctorAppointment;
    window.initAppointmentButtons = initAppointmentButtons;
    
    // Автоматическая инициализация при загрузке страницы
    document.addEventListener('DOMContentLoaded', initAppointmentButtons);
})();

