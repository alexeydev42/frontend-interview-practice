const getUser = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: 'Alex' });
    }, 300);
  });
};

const getTasks = (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId !== 1) {
        reject(new Error('Tasks not found'));
        return;
      }

      resolve([
        { id: 1, completed: true },
        { id: 2, completed: false },
        { id: 3, completed: true },
      ]);
    }, 500);
  });
};

const loadUserSummary = async (userId) => {
  try {
    const [user, tasks] = await Promise.all([
      getUser(userId),
      getTasks(userId),
    ]);

    const completedTasks = tasks.filter((task) => task.completed);

    return {
      name: user.name,
      completedTasks: completedTasks.length,
    };
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export { loadUserSummary };
