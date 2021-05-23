import { MarkdownPostProcessorContext, Plugin, } from 'obsidian';
import vegaEmbed from 'vega-embed'

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

const actOnCodeBlock = async (
	source: string,
	el: HTMLElement, 
	ctx: MarkdownPostProcessorContext
) => {
	try {
		const spec = JSON.parse(source)
		vegaEmbed(el, spec)
	} catch (e) {
		const pre = document.createElement('pre')
		pre.textContent = "Failed to parse vega source."
		el.appendChild(pre)
		console.error(e)
	}
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings | null = null;

	async onload() {
		console.log('loading plugin');

		await this.loadSettings();

		this.registerMarkdownCodeBlockProcessor(
			'vega',
			actOnCodeBlock
		)
	}

	onunload() {
		console.log('unloading plugin');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}