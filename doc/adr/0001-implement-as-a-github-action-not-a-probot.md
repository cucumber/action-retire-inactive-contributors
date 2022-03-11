# 1. Implement as a GitHub Action not a Probot

Date: 2022-03-11

## Status

Accepted

## Context

We initially thought we'd solve this problem using Probot, a framework for building GitHub apps. However GitHub apps are designed to react to events happening in GitHub, but we want this thing to just run on a schedule.

## Decision

Given the advice [here](https://github.com/probot/scheduler) we've decided to back-track on the decision to use Probot and instead implement this as a [JavaScript custom GitHub Action](https://docs.github.com/en/actions/creating-actions/about-custom-actions#javascript-actions).

## Consequences

This should simplify the codebase a great deal, and also make it a bit easier to test, since GitHub actions are just implemented as a JavaScript function. We can continue to use TypeScript for development, and compile it down to JavaScript as part of our build/deploy process. There's an example [here](https://github.com/actions/typescript-action).
