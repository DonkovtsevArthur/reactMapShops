module.exports = () =>
	`<!DOCTYPE html>
  <html lang="en">
      <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <title>Редактор номенклатуры</title>
          <link rel="stylesheet" href="./css/style.css" />
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&amp;subset=cyrillic,cyrillic-ext" rel="stylesheet">
          <link href="https://fonts.googleapis.com/css?family=Ubuntu:400,700&amp;subset=cyrillic,cyrillic-ext" rel="stylesheet">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
          <link rel="stylesheet" href="./css/style.css" />
      </head>
      <body>

          <div id="root"></div>
          
         <!--HelpMe Widget-->
        <script type='text/javascript'>
            (function() {
            var d = document;
            var w = window;

            function l() {
                var s = document.createElement('script');
                s.type = 'text/javascript';
                s.async = true;
                s.src = 'https://evohelpme.lad24.ru:1002/bottom';
                var ss = document.getElementsByTagName('script')[0];
                ss.parentNode.insertBefore(s, ss);
            }
            if (d.readyState == 'complete') {
                l();
            } else {
                if (w.attachEvent) {
                w.attachEvent('onload', l);
                } else {
                w.addEventListener('load', l, false);
                }
            }
            })();
        </script>
        <!--HelpMe Widget-->

        <script src="./js/bundle.js"></script>

      </body>
    </html>`
