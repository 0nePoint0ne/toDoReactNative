import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import ToDoScreen from './ToDoScreen';

describe('ToDoScreen', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<ToDoScreen />);

    expect(getByPlaceholderText('Write a task')).toBeTruthy();
    expect(getByText('Add Task')).toBeTruthy();
  });

  it('adds tasks when button is clicked', () => {
    const { getByPlaceholderText, getByText } = render(<ToDoScreen />);
    const input = getByPlaceholderText('Write a task');

    fireEvent.changeText(input, 'Test task');
    fireEvent.press(getByText('Add Task'));
    expect(getByText('Test task')).toBeTruthy();
  });

  it('updates task when clicked', () => {
    const { getByPlaceholderText, getByText } = render(<ToDoScreen />);
    const input = getByPlaceholderText('Write a task');

    fireEvent.changeText(input, 'Test task');
    fireEvent.press(getByText('Add Task'));
    fireEvent.press(getByText('Test task'));
    fireEvent.changeText(input, 'Updated task');
    fireEvent.press(getByText('Update Task'));
    expect(getByText('Updated task')).toBeTruthy();
  });

  it('deletes task when delete button is clicked', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<ToDoScreen />);
    const input = getByPlaceholderText('Write a task');

    fireEvent.changeText(input, 'Test task');
    fireEvent.press(getByText('Add Task'));
    fireEvent.press(getByText('Delete'));
    expect(queryByText('Test task')).toBeNull();
  });
});
