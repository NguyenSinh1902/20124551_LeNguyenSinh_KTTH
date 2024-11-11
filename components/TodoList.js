import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo } from '../redux/slices/todoSlice';
import { View, Text, FlatList, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos);
  const loading = useSelector(state => state.todos.loading);
  const error = useSelector(state => state.todos.error);

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    const newTodo = { name, avatar, price: parseFloat(price), type };
    dispatch(addTodo(newTodo));
    setName('');
    setAvatar('');
    setPrice('');
    setType('');
  };

  const filteredTodos = filterType === 'All' ? todos : todos.filter(todo => todo.type === filterType);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>The world’s Best Bike</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Avatar URL"
        value={avatar}
        onChangeText={setAvatar}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Type"
        value={type}
        onChangeText={setType}
      />
      <TouchableOpacity onPress={handleAddTodo} style={styles.addButton}>
        <Text style={styles.buttonText}>Add Bike</Text>
      </TouchableOpacity>
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setFilterType('All')} style={styles.filterButton}>
          <Text style={styles.buttonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilterType('Mountain')} style={styles.filterButton}>
          <Text style={styles.buttonText}>Mountain</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilterType('Road')} style={styles.filterButton}>
          <Text style={styles.buttonText}>Road</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredTodos}
        keyExtractor={item => item.id}
        numColumns={2}
        key={(numColumns) => numColumns.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>Price: ${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 35,
    color: '#DE8F5F',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 8,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#FFB26F',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  filterButton: {
    backgroundColor: '#FFB26F',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default TodoList;