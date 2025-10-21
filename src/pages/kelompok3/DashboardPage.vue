<template>
  <q-page class="container">
    <h2>Dashboard</h2>
    <p><strong>Nama:</strong> <span id="dashNama"></span></p>
    <p><strong>NIM:</strong> <span id="dashNIM"></span></p>

    <h3>Jadwal Mata Kuliah</h3>

    <table style="width:100%">
      <tbody>
        <tr>
        <th Colspan="6">Semester 4</th>

      </tr>
      <tr>
        <th>Jam </th>
        <th>Senin</th>
        <th>Selasa</th>
        <th>Rabu</th>
        <th>Kamis</th>
        <th>Jumat</th>

      </tr>
      <tr style="height:50px">
        <td>10:00-12:00</td>
        <td>Sitem Digital 2 </td>
        <td> </td>
        <td>Pemrograman Client server & praktikum</td>
        <td>Metode Penelitian</td>
        <td> </td>
      </tr>
      <tr style="height:50px">
        <td>14:00-16:00</td>
        <td>Struktur Data</td>
        <td>Jarkom 2</td>
        <td>Sistem Telekomunikasi seluler</td>
        <td>Pemrograman perangkat bergerak & praktikum </td>
        <td>Sistem Mikroprosesor & praktikum</td>



      </tr>
      </tbody>

    </table>


    <h3>Task / Tugas</h3>
    <select id="taskMatakuliah">
      <option value="">Pilih Mata Kuliah</option>
      <option value="Sistal 2">Sistal 2</option>
      <option value="Struktur Data">Struktur Data</option>
      <option value="Jarkom 2">Jarkom 2</option>
      <option value="Pemrograman Client Server">Pemrograman Client Server</option>
      <option value="Sistem Mikroprosesor">Sistem Mikroprosesor</option>
      <option value="Metode Penelitian">Metode Penelitian</option>
      <option value="Pemrograman Perangkat Bergerak">Pemrograman Perangkat Bergerak</option>
      <option value="Sistem Telekomunikasi seluler">Sistem Telekomunikasi seluler</option>
    </select>
    <input type="text" id="taskJudul" placeholder="Judul Tugas" />
    <input type="datetime-local" id="taskDeadline" />
    <button @click="tambahTask()">Tambah Tugas</button>

    <div id="taskList" class="task-list">
      <h4>Daftar Tugas</h4>
      <ul id="taskItems">
        <li v-for="(task, index) in tasks" :key="index">
          {{ task.hari }} - {{ task.judul }} (Deadline: {{ task.deadline }})
          <button @click="hapusTask(index)" style="float:right; background:#e74c3c; color:#fff; border:none; padding:5px 10px; border-radius:4px;">Hapus</button>
        </li>
      </ul>
    </div>

    <button class="logout-btn" @click="logout()">Logout</button>

  </q-page>
</template>

<script setup>
import { ref } from 'vue';

const tasks = ref(JSON.parse(localStorage.getItem('tasks')) || []);
function tambahTask() {
    const hari = document.getElementById('taskHari').value;
    const judul = document.getElementById('taskJudul').value;
    const deadline = document.getElementById('taskDeadline').value;

    if (hari && judul && deadline) {

      tasks.value.push({ hari, judul, deadline });
      localStorage.setItem('tasks', JSON.stringify(tasks));
      document.getElementById('taskHari').value = "";
      document.getElementById('taskJudul').value = "";
      document.getElementById('taskDeadline').value = "";
    } else {
      alert("Lengkapi semua isian tugas.");
    }
  }



  function hapusTask(index) {

    tasks.value.splice(index, 1); // hapus berdasarkan index
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
</script>
