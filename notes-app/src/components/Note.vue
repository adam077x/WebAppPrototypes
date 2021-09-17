<template>
	<div class="note m-4">
		<input type="text" class="title-input" @change="editTask(index, this.value)" v-model="value">
		<button class="delete" @click="deleteNote(this.index)">X</button>
		<hr>
		<textarea type="text" @change="editMsg(index, this.msgValue)" v-model="msgValue"></textarea>
	</div>
</template>

<script>
export default {
	name: 'HelloWorld',
	props: {
		title: String,
		msg: String,
		index: Number,
		deleteNote: Function,
		editTask: Function,
		editMsg: Function
	},
	data() {
		return {
			value: '',
			msgValue: ''
		}
	},
	mounted() {
		this.value = this.title;
		this.msgValue = this.msg;
	}
}
</script>

<style scoped lang="scss">
.note {
	background: rgb(176, 255, 176);
	width: 200px;
	height: 250px;
	padding: 10px;
	border-radius: 10px;
	box-shadow: 5px 5px #0000001c;
}

hr {
	margin-top: 5px;
	margin-bottom: 5px;
	width: 200px;
	margin-left: -10px;
}

.msg {
	height: 180px;
}

.title-input {
	width: 100%;
	background: none;
	border: none;
	font-weight: bold;
	font-size: 22px;
	width: 90%;
}
textarea {
	background: none;
	border: none;
	height: 80%;
	width: 100%;
	resize: none;
}

.delete {
	position: absolute;
	transform: translateX(0%);
	font-weight: bold;
	float: right;
	font-size: 22px;
	border: none;
	background: none;
}

::-webkit-scrollbar {
	display: none;
}
</style>
