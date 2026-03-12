## Introduction

Building a real-time operating system from scratch is one of the most educational exercises in embedded systems engineering. In this post, I'll walk through the key concepts and implementation details of my custom RTOS for STM32F4 microcontrollers.

## Why Build Your Own RTOS?

While production systems should use battle-tested solutions like FreeRTOS or Zephyr, building your own teaches you:

- **Context switching** at the hardware level
- **Scheduling algorithms** and their trade-offs
- **Synchronization primitives** and race conditions
- **Memory management** in constrained environments

## The Scheduler

The heart of any RTOS is its scheduler. I implemented a priority-based preemptive scheduler that uses the ARM Cortex-M4's PendSV exception for context switching.

```c
void scheduler_run(void) {
    task_t *next = get_highest_priority_ready();
    if (next != current_task) {
        trigger_pendsv(); // Request context switch
    }
}
```

## Context Switching

The PendSV handler saves the current task's context (registers R4-R11, LR) onto its stack and restores the next task's context. This happens entirely in ARM Assembly for precise control.

## What's Next

In the next post, I'll cover implementing message queues and semaphores for inter-task communication.
