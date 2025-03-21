<template>
	<div class="container">
		<!-- Barre latérale -->
		<aside class="sidebar">
			<h2>Composants</h2><br><br>
			<ul>
				<li v-for="comp in components" :key="comp" @click="loadReadme(comp)">
					{{ comp }}
				</li>
			</ul>
		</aside>

		<!-- Zone d'affichage du README -->
		<main class="content">
			<span @click="goToExamplePage" class="example-link"> => Go to example pages.</span>
			<div class="flex-row doc-header">
				<span class="header-component-name">{{ selectedComponent || "Sélectionnez un composant" }}</span>
				<div  v-if="isEditing" class="div-btn-edit flex-row" style="margin-top: 10px;">
					<ButtonComponent @click="saveReadme" class="btn-edit" :title="'Sauvegarder'" :className="'gts-button'" />
					<ButtonComponent :theme="PRIMARY_INVERSE" @click="isEditing = false" class="btn-edit" :title="'Annuler'"
						:className="'gts-button'" />
				</div>
				<div v-else>
					<ButtonComponent @click="startEditing" class="mb-20"
					:title="selectedComponent ? 'Modifier' : 'Créer un README'" :className="'gts-button'" />
				</div>
				
				
			</div>

			<!-- Mode édition -->
			<div v-if="isEditing">
				<!-- Boutons -->
			
				<div style="display: flex; gap: 20px;">
					<!-- Éditeur Markdown -->
					<textarea v-model="readmeContent" rows="20" style="width: 50%; font-family: monospace;"></textarea>

					<!-- Aperçu en temps réel -->
					<div style="width: 50%; border: 1px solid #ccc; padding: 10px; overflow-y: auto;" v-html="readmeHtml"></div>
				</div>


			</div>

			<!-- Mode aperçu -->
			<div v-else>
				

				<div v-html="readmeHtml"></div> <!-- Aperçu HTML -->
			</div>
		</main>
	</div>
</template>


<script>
import { marked } from 'marked'; // Pour convertir Markdown en HTML
import ButtonComponent from './components/button/ButtonComponent.vue';
import { PRIMARY, PRIMARY_INVERSE, PRIMARY_50, PRIMARY_50_INVERSE, DANGER, DANGER_INVERSE, DANGER_LIGHT, DANGER_LIGHT_INVERSE  } from '@/constants/buttons.js';

export default {
	name: "DocumentationPage",
	components: {
		ButtonComponent
	},
	data() {
		return {
			PRIMARY_INVERSE,
			components: [], // Liste des composants
			selectedComponent: null, // Composant sélectionné
			readmeContent: "", // Contenu du README (en Markdown)
			readmeHtml: "", // Contenu du README (en HTML)
			isEditing: false, // Mode édition
			readmeFiles: import.meta.glob("/src/components/*/README.md", { query: '?raw', import: 'default' }) // Importer les fichiers README
		};
	},
	mounted() {
		// Extraire les noms des composants depuis les chemins des fichiers
		this.components = Object.keys(this.readmeFiles).map((path) => {
			const componentName = path.split("/")[3]; // Extraire le nom du composant
			return componentName;
		});
	},
	methods: {
		async loadReadme(componentName) {
			this.selectedComponent = componentName;
			const filePath = `/src/components/${componentName}/README.md`;

			if (this.readmeFiles[filePath]) {
				this.readmeContent = await this.readmeFiles[filePath](); // Charger le contenu Markdown
				this.readmeHtml = marked.parse(this.readmeContent); // Convertir en HTML
				this.isEditing = false; // Désactiver le mode édition au chargement
			} else {
				this.readmeContent = "README non trouvé.";
				this.readmeHtml = "README non trouvé.";
			}
		},
		startEditing() {
			this.isEditing = true; // Activer le mode édition
		},
		async saveReadme() {
			if (!this.selectedComponent) return;

			// Sauvegarder le Markdown
			const filePath = `/src/components/${this.selectedComponent}/README.md`;
			try {
				await this.saveFile(filePath, this.readmeContent);
				this.readmeHtml = marked.parse(this.readmeContent); // Mettre à jour l'aperçu
				this.isEditing = false; // Désactiver le mode édition
				console.log("README sauvegardé avec succès !");
			} catch (error) {
				console.error("Erreur lors de la sauvegarde du README :", error);
			}
		},
		async saveFile(filePath, content) {
			// Simuler une sauvegarde (à adapter selon votre environnement)
			console.log("Simulation de sauvegarde :", filePath, content);
		},
		goToExamplePage() {
      this.$router.push('/examples'); // Redirige vers /home
    }
	},
	watch: {
		readmeContent(newContent) {
			// Mettre à jour l'aperçu en temps réel lorsque le Markdown change
			this.readmeHtml = marked.parse(newContent);
		}
	}
};
</script>



<style scoped>
.example-link {
	display: inline-block;
	margin-bottom: 20px;
	color: rgb(23, 177, 248);
	cursor: pointer;

}

.example-link:hover {
 
		text-decoration: underline;
		color: rgb(32, 128, 255);
 
}

.flex-row {
	display: flex;
	flex-direction: row;
}

.doc-header {
	justify-content: space-between;

	.header-component-name {
		font-size: 20px;
		font-weight: bold;
	}
     
}



.div-btn-edit {
	justify-content: end;
	margin-top: 30px;
	margin-bottom: 30px;
}

.btn-edit {
	margin-right: 5px;
	 
}
 

.container {
	display: flex;
	height: 100vh;
	font-size: 14px;
}

.sidebar {
	width: 250px;
	background: #005467;
	color: white;
	padding: 20px;
}

.sidebar ul {
	list-style: none;
	padding: 0;
}

.sidebar li {
	cursor: pointer;
	padding: 10px;
}

.sidebar li:hover {
	background: #ffffff;
	color: #005467;
}

.content {
	flex: 1;
	padding: 20px;
	overflow-y: auto;
}

/* Styles pour le contenu Markdown */
.content :deep(h1),
.content :deep(h2),
.content :deep(h3) {
	margin-top: 1.5em;
	margin-bottom: 0.5em;
}

.content :deep(p) {
	margin-bottom: 1em;
	line-height: 1.6;
}

.content :deep(code) {
	background: #f4f4f4;
	padding: 0.2em 0.4em;
	border-radius: 3px;
	font-family: monospace;
}

.content :deep(pre) {
	background: #f4f4f4;
	padding: 1em;
	border-radius: 5px;
	overflow-x: auto;
}

.content :deep(pre code) {
	background: none;
	padding: 0;
}

.content :deep(a) {
	color: #42b983;
	text-decoration: none;
}

.content :deep(a:hover) {
	text-decoration: underline;
}
</style>