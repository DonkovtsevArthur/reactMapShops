import React from 'react'
import Title from '../Title'

const Help = () => (
	<div>
		<Title title="Инструкция по установке" />
		<ol>
			<li>Скачайте и установите драйвер для Вашего принтера Zebra.</li>
			<li>
				Скачайте и установите Zebra Web Printing{' '}
				<a href="http://165104.selcdn.ru/static/printlabels/zebra-browser-print-setup.exe">
					по ссылке
				</a>
				<br />
				<img src="./img/image1.png" className="help__img" alt="Устанвока" />
			</li>
			<li>
				После установки в области уведомлений должен появиться значок Zebra Web Printing
				<img src="./img/image2.png" className="help__img" alt="Значек" />
			</li>
			<li>
				Щелкните правой кнопкой мыши по значку и выберите пункт Settings. Откроется окно настроек
				программы..
			</li>
			<li>
				Нажмите кнопку Change, откроется окно выбора принтера по умолчанию.
				<img src="./img/image3.png" className="help__img" alt="Выбор принтера" />
			</li>
			<li>
				В появившемся окне выберите Ваш принтер и нажмите кнопку Set
				<img src="./img/image4.png" className="help__img" alt="Окно настроек" />
			</li>
			<li>Настройка завершена. Можно закрыть все окна и пользоваться программой.</li>
		</ol>
		<h3>Обратите внимание:</h3>
		<ol>
			<li>
				Для работы программы “Печать этикеток” необходимо, чтобы приложение Zebra Web Printing было
				запущено (его значок должен находиться в области уведомлений).
			</li>
			<li>
				Если у Вас некорректно печатается кириллица, установите на принтер шрифт Swiss Unicode с
				поддержкой кириллицы, следуя инструкциям производителя.
			</li>
			<li>Для стабильной работы программы рекомендуем пользоваться браузером Chrome.</li>
		</ol>
		<p>
			В случае возникновения проблем при подключении оборудования или установке драйвера, пишите нам
			на почту <a href="mailto:retailsupport@lad24.ru">retailsupport@lad24.ru</a> или звоните по
			телефону +7 (831) 2-331-331.
		</p>
		<p>
			<strong>Наши специалисты непременно помогут!</strong>
		</p>
	</div>
)

export default Help
