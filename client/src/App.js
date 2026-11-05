import React, { useState, useEffect, useCallback } from "react";
import "./App.css";

import TasksList from "./components/TaskList";

const filters = [
  { key: "all", label: "All tasks" },
  { key: "open", label: "To do" },
  { key: "done", label: "Completed" },
];

const readResponse = async (response) => {
  let payload = {};

  try {
    payload = await response.json();
  } catch (error) {
    payload = {};
  }

  if (!response.ok) {
    throw new Error(payload.error || `Request failed (${response.status}).`);
  }

  return payload;
};

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [busyTaskId, setBusyTaskId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const getTasks = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/tasks");
      const loadedTasks = await readResponse(response);
      setTasks(loadedTasks);
    } catch (requestError) {
      setError(requestError.message || "Could not load tasks.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const addTask = async (event) => {
    event.preventDefault();
    const title = newTaskTitle.trim();

    if (!title) {
      return;
    }

    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/tasks/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      const task = await readResponse(response);
      setTasks((currentTasks) => [task, ...currentTasks]);
      setNewTaskTitle("");
    } catch (requestError) {
      setError(requestError.message || "Could not add that task.");
    } finally {
      setSaving(false);
    }
  };

  const toggleTask = async (task) => {
    setBusyTaskId(task._id);
    setError("");

    try {
      const response = await fetch(`/api/tasks/update/${task._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: !task.done }),
      });
      const updatedTask = await readResponse(response);
      setTasks((currentTasks) =>
        currentTasks.map((item) =>
          item._id === updatedTask._id ? updatedTask : item,
        ),
      );
    } catch (requestError) {
      setError(requestError.message || "Could not update that task.");
    } finally {
      setBusyTaskId(null);
    }
  };

  const deleteTask = async (task) => {
    setBusyTaskId(task._id);
    setError("");

    try {
      const response = await fetch(`/api/tasks/delete/${task._id}`, {
        method: "DELETE",
      });
      await readResponse(response);
      setTasks((currentTasks) =>
        currentTasks.filter((item) => item._id !== task._id),
      );
    } catch (requestError) {
      setError(requestError.message || "Could not delete that task.");
    } finally {
      setBusyTaskId(null);
    }
  };

  const completedCount = tasks.filter((task) => task.done).length;
  const remainingCount = tasks.length - completedCount;
  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === "open") return !task.done;
    if (activeFilter === "done") return task.done;
    return true;
  });
  const completionRate = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Tasks home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="m6.5 12.5 3.4 3.4 7.7-8" />
            </svg>
          </span>
          <span className="brand-name">
            DAYMARK<span> / TASKS</span>
          </span>
        </a>
        <span className="workspace-label">
          <span className="status-dot" /> Personal workspace
        </span>
      </header>

      <main className="workspace">
        <section className="intro">
          <div className="intro-copy">
            <p className="eyebrow">A LITTLE CLARITY GOES A LONG WAY</p>
            <h1>
              Make space for
              <br />
              <em>what matters.</em>
            </h1>
            <p className="intro-note">
              One step at a time. Your list is ready when you are.
            </p>
          </div>

          <div className="summary" aria-label="Task summary">
            <div className="summary-item">
              <span className="summary-value">{tasks.length}</span>
              <span className="summary-label">On your list</span>
            </div>
            <div className="summary-item">
              <span className="summary-value">{remainingCount}</span>
              <span className="summary-label">Still to do</span>
            </div>
            <div className="summary-item">
              <span className="summary-value">{completedCount}</span>
              <span className="summary-label">Completed</span>
            </div>
          </div>
        </section>

        <section className="task-panel" aria-labelledby="tasks-heading">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">YOUR PLAN</p>
              <h2 id="tasks-heading">
                Tasks <span className="heading-count">{remainingCount}</span>
              </h2>
            </div>
            <div className="progress-summary">
              <span>{completionRate}% complete</span>
              <div
                className="progress-track"
                aria-label={`${completionRate}% complete`}
              >
                <span style={{ width: `${completionRate}%` }} />
              </div>
            </div>
          </div>

          <form className="add-form" onSubmit={addTask}>
            <label className="visually-hidden" htmlFor="new-task">
              Add a task
            </label>
            <input
              id="new-task"
              type="text"
              maxLength={160}
              placeholder="What would you like to get done?"
              value={newTaskTitle}
              onChange={(event) => setNewTaskTitle(event.target.value)}
            />
            <button type="submit" disabled={saving || !newTaskTitle.trim()}>
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M10 4v12M4 10h12" />
              </svg>
              {saving ? "Adding..." : "Add task"}
            </button>
          </form>

          {error && (
            <div className="error-message" role="alert">
              <span>{error}</span>
              {tasks.length === 0 && !loading && (
                <button type="button" onClick={getTasks}>
                  Retry
                </button>
              )}
            </div>
          )}

          <div className="list-toolbar">
            <div className="filter-tabs" role="group" aria-label="Filter tasks">
              {filters.map((filter) => {
                const count =
                  filter.key === "all"
                    ? tasks.length
                    : filter.key === "open"
                    ? remainingCount
                    : completedCount;

                return (
                  <button
                    key={filter.key}
                    type="button"
                    className={
                      activeFilter === filter.key
                        ? "filter-tab is-active"
                        : "filter-tab"
                    }
                    aria-pressed={activeFilter === filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                  >
                    {filter.label}
                    <span>{count}</span>
                  </button>
                );
              })}
            </div>
            <span className="list-count">
              {filteredTasks.length}{" "}
              {filteredTasks.length === 1 ? "task" : "tasks"}
            </span>
          </div>

          {loading ? (
            <div className="empty-state" role="status">
              <span className="loading-spinner" />
              <p>Loading your tasks...</p>
            </div>
          ) : filteredTasks.length ? (
            <TasksList
              tasks={filteredTasks}
              busyTaskId={busyTaskId}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ) : (
            <div className="empty-state">
              <span className="empty-mark" aria-hidden="true">
                <svg viewBox="0 0 32 32">
                  <path d="m8 16.5 5 5 11-11" />
                </svg>
              </span>
              <h3>
                {error
                  ? "Your list could not load"
                  : activeFilter === "all"
                  ? "A fresh page"
                  : "Nothing here yet"}
              </h3>
              <p>
                {error
                  ? "Check the connection above and try again."
                  : activeFilter === "done"
                  ? "Finished tasks will show up here."
                  : activeFilter === "open"
                  ? "You are all caught up. Enjoy the breathing room."
                  : "Add your first task above and get it out of your head."}
              </p>
            </div>
          )}
        </section>

        <footer className="page-footer">
          <span>Small steps add up.</span>
          <span>
            DAYMARK <i>•</i> PERSONAL TASKS
          </span>
        </footer>
      </main>
    </div>
  );
};

export default App;
