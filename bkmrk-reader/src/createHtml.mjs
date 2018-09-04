const createHtml = contents => {
  return `
	<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Bkmrk Reader</title>
	<style type="text/css">
		html,
		body {
			font-size: 18px;
			line-height: 1.5;
		}

		.contents {
			max-width: 45em;
			padding: 0 0.5em;
			margin: 1em auto;
		}

		img {
			max-width: 100%;
		}

		.bkmrk-loadbutton {
			width: 100%;
			height: 100px;
			border: 1px solid rgba(207, 215, 223, 0.25);
			border-radius: 3px;
			background-color: #F5F5F5;
			color: #6b7c93;
			cursor: pointer;
		}

		.bkmrk-display-none {
			display: none;
		}
	</style>
</head>

<body>
	<div id="root" class="contents"></div>
</body>
<script type="text/javascript">
	const htmlStr = \`${contents}\`
	const root = document.getElementById('root');

	const contents = document.createElement('div');
	contents.innerHTML = htmlStr;

	const images = contents.getElementsByTagName('img');
	const iframes = contents.getElementsByTagName('iframe');

	function insertAfter(newNode, referenceNode) {
		referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	}

	function removeElement(referenceNode) {
		referenceNode.parentNode.removeChild(referenceNode);
	}

	function getImageBack(e, image, button) {
		e.preventDefault();
		removeElement(button);
		image.srcset = image.dataset.srcset;
		image.src = image.dataset.src;
		image.classList.remove("bkmrk-display-none");
	}

	function getIFrameBack(e, iframe, button) {
		e.preventDefault();
		removeElement(button);
		iframe.src = iframe.dataset.src;
		iframe.classList.remove("bkmrk-display-none");
	}

	for (let image of images) {
		const srcset = image.srcset;
		const src = image.src
		image.srcset = "";
		image.src = "";
		image.dataset.srcset = srcset;
		image.dataset.src = src;
		image.classList.add("bkmrk-display-none");
		const button = document.createElement('button');
		button.className = "bkmrk-loadbutton";
		button.addEventListener('click', (e) => getImageBack(e, image, button));
		button.innerHTML = "Show Image";
		insertAfter(button, image)
	}

	for (let iframe of iframes) {
		const src = iframe.src
		iframe.src = "";
		iframe.dataset.src = src;
		iframe.classList.add("bkmrk-display-none");
		const button = document.createElement('button');
		button.className = "bkmrk-loadbutton";
		button.addEventListener('click', (e) => getIFrameBack(e, iframe, button));
		button.innerHTML = "Show Iframe";
		insertAfter(button, iframe)
	}


	root.appendChild(contents);

</script>

</html>
`;
};

export default createHtml;
