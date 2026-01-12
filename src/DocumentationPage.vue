<template>
	<div class="container">
		<!-- Sidebar -->
		<aside class="sidebar">
			<h2>Components</h2><br><br>
			<ul>
				<li v-for="comp in components" :key="comp" @click="loadReadme(comp)">
					{{ comp }}
				</li>
			</ul>
		</aside>

		<!-- Content Area -->
		<main class="content">
			<div class="flex-row doc-header">
				<span class="header-component-name">{{ selectedComponent || "Select a component" }}</span>
				<div v-if="isEditing" class="div-btn-edit flex-row" style="margin-top: 10px;">
					<ButtonComponent @click="saveReadme" class="btn-edit" :title="'Save'" :className="'gts-button'" />
					<ButtonComponent :theme="PRIMARY_INVERSE" @click="isEditing = false" class="btn-edit" :title="'Cancel'"
						:className="'gts-button'" />
				</div>
				<div v-else>
					<ButtonComponent @click="startEditing" class="mb-20"
						:title="selectedComponent ? 'Edit' : 'Create README'" :className="'gts-button'" />
				</div>
			</div>

			<!-- Editing Mode -->
			<div v-if="isEditing">
				<div style="display: flex; gap: 20px;">
					<!-- Markdown Editor -->
					<textarea v-model="readmeContent" rows="20" style="width: 50%; font-family: monospace;"></textarea>

					<!-- Live Preview -->
					<div style="width: 50%; border: 1px solid #ccc; padding: 10px; overflow-y: auto;" v-html="readmeHtml">
					</div>
				</div>
			</div>

			<!-- Preview Mode -->
			<div v-else>
				<div v-html="readmeHtml"></div> <!-- HTML Preview -->
				
				<!-- Example Section -->
				<div v-if="selectedComponent && currentExampleComponent" class="example-section">
					<h3>Example</h3>
					<div class="example-container">
						<component :is="currentExampleComponent" />
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
import { marked } from 'marked';
import ButtonComponent from './components/button/ButtonComponent.vue';
import { PRIMARY_INVERSE } from '@/constants/buttons.js';
import { shallowRef, defineAsyncComponent } from 'vue';

// Import all example components
import AutoCompleteExample from './components/input/AutoCompleteExample.vue';
import NotificationExemple from './components/notification/NotificationExemple.vue';
import BarSideExemple from './components/barside/BarSideExemple.vue';
import InputExemple from './components/input/InputExemple.vue';
import DataTableExemple from './components/table/DataTableExemple.vue';
import ButtonExample from './components/button/ButtonExample.vue';
import DialogExample from './components/dialog/DialogExample.vue';
import RadioExemple from './components/radio/RadioExemple.vue';
import CheckBoxExemple from './components/checkbox/CheckBoxExemple.vue';
import AccordionExemple from './components/accordion/AccordionExemple.vue';
import BadgeExample from './components/badge/BadgeExample.vue';
import CardExample from './components/card/CardExample.vue';
import CalendarExample from './components/calendar/CalendarExample.vue';
import StepperExample from './components/stepper/StepperExample.vue';
import ToolTipExample from './components/tooltip/ToolTipExample.vue';
import NoContentExample from './components/nocontent/NoContentExample.vue';
import ToggleExemple from './components/toggle/ToggleExemple.vue';

export default {
	name: "DocumentationPage",
	components: {
		ButtonComponent
	},
	data() {
		return {
			PRIMARY_INVERSE,
			components: [],
			selectedComponent: null,
			readmeContent: "",
			readmeHtml: "",
			isEditing: false,
			readmeFiles: import.meta.glob("/src/components/*/README.md", { query: '?raw', import: 'default' }),
			currentExampleComponent: null,
			// Map directory names to example components
			exampleMap: {
				"autocomplete": AutoCompleteExample, // Assuming directory is 'autocomplete' - NO, it was in 'input'
				// Let's rely on checking the directory structure we saw earlier.
				"notification": NotificationExemple,
				"barside": BarSideExemple,
				"input": InputExemple, 
			    "table": DataTableExemple,
				"button": ButtonExample,
    			"dialog": DialogExample,
    			"radio": RadioExemple,
    			"checkbox": CheckBoxExemple,
    			"accordion": AccordionExemple,
    			"badge": BadgeExample,
    			"card": CardExample,
    			"calendar": CalendarExample,
    			"stepper": StepperExample,
    			"tooltip": ToolTipExample,
    			"nocontent": NoContentExample,
    			"toggle": ToggleExemple,
			}
		};
	},
	mounted() {
		this.components = Object.keys(this.readmeFiles).map((path) => {
			const componentName = path.split("/")[3];
			return componentName;
		});
	},
	methods: {
		async loadReadme(componentName) {
			this.selectedComponent = componentName;
			const filePath = `/src/components/${componentName}/README.md`;

			if (this.readmeFiles[filePath]) {
				this.readmeContent = await this.readmeFiles[filePath]();
				this.readmeHtml = marked.parse(this.readmeContent);
				this.isEditing = false;
				
				// Load example component
				// We need to resolve which example component to show.
				// Since some directories have multiple examples (e.g. input), or we might need a better mapping strategy.
				// For now, let's use the simple map and see what breaks.
				// If a directory has multiple examples, we might only show the main one.
				
				// Special handling for 'input' directory which seemed to have AutoComplete and Input examples.
				if (componentName === 'input') {
					// We might want to show both? Or just InputExemple.
					// The user asked to remove ExamplePage which showed both.
					// Let's default to InputExemple for now.
					this.currentExampleComponent = InputExemple;
				} else {
					this.currentExampleComponent = this.exampleMap[componentName] || null;
				}
				
			} else {
				this.readmeContent = "README not found.";
				this.readmeHtml = "README not found.";
				this.currentExampleComponent = null;
			}
		},
		startEditing() {
			this.isEditing = true;
		},
		async saveReadme() {
			if (!this.selectedComponent) return;

			// Saving logic... (simulated as before)
			const filePath = `/src/components/${this.selectedComponent}/README.md`;
			try {
				await this.saveFile(filePath, this.readmeContent);
				this.readmeHtml = marked.parse(this.readmeContent);
				this.isEditing = false;
				console.log("README saved successfully!");
			} catch (error) {
				console.error("Error saving README:", error);
			}
		},
		async saveFile(filePath, content) {
			console.log("Simulation save:", filePath, content);
		}
	},
	watch: {
		readmeContent(newContent) {
			this.readmeHtml = marked.parse(newContent);
		}
	}
};
</script>

<style scoped>
.flex-row {
	display: flex;
	flex-direction: row;
}

.doc-header {
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;

	.header-component-name {
		font-size: 24px;
		font-weight: bold;
		color: #333;
	}
}

.div-btn-edit {
	justify-content: end;
}

.btn-edit {
	margin-right: 5px;
}

.container {
	display: flex;
	height: 100vh;
	font-size: 14px;
	font-family: 'Poppins', sans-serif;
}

.sidebar {
	width: 250px;
	background: #005467;
	color: white;
	padding: 20px;
	overflow-y: auto;
}

.sidebar h2 {
	margin-top: 0;
	border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	padding-bottom: 10px;
}

.sidebar ul {
	list-style: none;
	padding: 0;
}

.sidebar li {
	cursor: pointer;
	padding: 12px 10px;
	border-radius: 4px;
	transition: background 0.3s;
}

.sidebar li:hover {
	background: rgba(255, 255, 255, 0.1);
}

.content {
	flex: 1;
	padding: 40px;
	overflow-y: auto;
	background-color: #f9f9f9;
}

.example-section {
	margin-top: 40px;
	border-top: 1px solid #e0e0e0;
	padding-top: 20px;
}

.example-section h3 {
	margin-bottom: 20px;
	color: #005467;
}

.example-container {
	background: white;
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

/* Styles for Markdown content */
.content :deep(h1),
.content :deep(h2),
.content :deep(h3) {
	margin-top: 1.5em;
	margin-bottom: 0.5em;
	color: #2c3e50;
}

.content :deep(p) {
	margin-bottom: 1em;
	line-height: 1.6;
	color: #555;
}

.content :deep(code) {
	background: #eee;
	padding: 0.2em 0.4em;
	border-radius: 3px;
	font-family: monospace;
	color: #e83e8c;
}

.content :deep(pre) {
	background: #2d2d2d;
	color: #f8f8f2;
	padding: 1.5em;
	border-radius: 6px;
	overflow-x: auto;
	margin: 1em 0;
}

.content :deep(pre code) {
	background: none;
	padding: 0;
	color: inherit;
}

.content :deep(a) {
	color: #005467;
	text-decoration: none;
	font-weight: 500;
}

.content :deep(a:hover) {
	text-decoration: underline;
}
</style>