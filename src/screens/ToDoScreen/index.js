import React, { useState } from "react";
import { View, Text, Button, FlatList, TextInput } from "react-native";
import styles from "../../styles";

function ToDoScreen() {
  const [id, setId] = useState(null);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    setTasks([...tasks, { id: Date.now().toString(), title: task }]);
    setTask("");
  };

  const handleUpdateTask = (id, newTitle) => {
    setTasks(
      tasks.map((task, index) =>
        index === id ? { ...task, title: newTitle } : task
      )
    );
    setTask("");
    setId(null);
  };

  const handleDeleteTask = (index) => {
    let itemsCopy = [...tasks];
    itemsCopy.splice(index, 1);
    setTasks(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TODO:</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <Text onPress={() => setId(index)}>{item.title}</Text>
            <Button title="Delete" onPress={() => handleDeleteTask(index)} />
          </View>
        )}
      />
      <View style={styles.row}>
        <TextInput
          value={task}
          onChangeText={(text) => setTask(text)}
          placeholder={"Write a task"}
        />
        <Button
          title={id !== null ? `Update Task` : `Add Task`}
          onPress={() =>
            id !== null ? handleUpdateTask(id, task) : handleAddTask()
          }
        />
      </View>
    </View>
  );
}

export default ToDoScreen;
