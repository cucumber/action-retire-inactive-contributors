// Copyright Titanium I.T. LLC. MIT License
'use strict'

import EventEmitter from 'events'

/** A utility class for infrastructure wrappers to use track output */
export class OutputTracker {
  private _data: string[]
  private _trackerFn: (eventName: string) => void

  static create(emitter: EventEmitter, event: string) {
    return new OutputTracker(emitter, event)
  }

  constructor(
    private readonly _emitter: EventEmitter,
    private readonly _event: string
  ) {
    this._data = []

    this._trackerFn = (text: string) => this._data.push(text)
    this._emitter.on(this._event, this._trackerFn)
  }

  get data() {
    return this._data
  }

  consume() {
    const result = [...this._data]
    this._data.length = 0
    return result
  }

  off() {
    this.consume()
    this._emitter.off(this._event, this._trackerFn)
  }
}
