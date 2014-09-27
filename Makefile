acid.html:acid.png loader.html
	cat acid.png > acid.html
	./makeloader.sh >> acid.html
	wc -c acid.html

acid.png:acid.min.rev.js
	rawtopgm `wc -c acid.min.rev.js | cut -d" " -f1` 1 < acid.min.rev.js | pnmtopng > acid.png
	optipng -O7 acid.png

acid.min.rev.js:acid.min.js
	rev < acid.min.js > acid.min.rev.js

acid.min.js :acid.js
	closure --compilation_level SIMPLE_OPTIMIZATIONS < acid.js | tr -d "\n" > acid.min.js
	wc -c acid.min.js

clean:
	rm -f acid.min.js acid.min.rev.js acid.png acid.html
