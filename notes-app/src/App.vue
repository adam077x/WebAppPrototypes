<template>
	<div v-if="renderComponent" class="notes">
		<Note v-for="(note, index) in notes" v-bind:key="index" :index="index" v-bind:deleteNote="deleteNote" :editMsg="editMsg" :editTask="editTask" v-bind:title="note.title" :msg="note.msg"/>
		<button class="create-button mt-4" @click="createNote"><i class="bi bi-plus-lg"></i></button>
	</div>
</template>

<script>
import Note from './components/Note.vue'

export default {
	name: 'App',
	components: {
		Note
	},
	data() {
		return {
			msg: '',
			notes: [
			],
			renderComponent: true
		}
	},
	mounted() {
		let notesStorage = localStorage.getItem("notes");
		console.log(notesStorage)
		if(notesStorage != null) {
			this.notes = JSON.parse(notesStorage);
			console.log(this.notes)
		}
	},
	methods: {
		createNote() {
			this.notes.push({
				title: "TITLE",
				msg: "Pariatur esse pariatur esse ad sunt ea cupidatat ea fugiat ipsum dolore est."
			})
			localStorage.setItem("notes", JSON.stringify(this.notes));
		},
		deleteNote(index) {
			this.notes.splice(index, 1);
			localStorage.setItem("notes", JSON.stringify(this.notes));
			
			this.renderComponent = false;

			this.$nextTick().then(() => {
				this.renderComponent = true;
			});
		},
		editTask(index, title) {
			this.notes[index].title = title;
			localStorage.setItem("notes", JSON.stringify(this.notes));
		},
		editMsg(index, msg) {
			this.notes[index].msg = msg;
			localStorage.setItem("notes", JSON.stringify(this.notes));
		}
	}
}
</script>

<style lang="scss">
body {
	background: cyan;
}

.notes {
  display: flex;  
  flex-wrap: wrap;

  .create-button {
	color: black;
	background: none;
	border: px solid black;
	border-radius: 10px;
	text-align: center;
	width: 200px;
	height: 250px;
	font-size: 32px;
	margin-left: 20px;
  }
}
</style>
