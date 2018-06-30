'use babel'

import {CompositeDisposable, Range} from 'atom'

let disposables

export function activate() {
  disposables = new CompositeDisposable()
  const d = disposables
  d.add(
    atom.workspace.observeTextEditors(async (editor) => {
      const buffer = editor.getBuffer()
      d.add(
        buffer.onDidChangeText(({changes}) => {
          for (const { newRange } of changes) {
            console.log('calling find for', newRange)
            console.log(buffer
              .findAllInRangeSync(/(?:asd)*/, Range.fromObject([
                [newRange.start.row, 0],
                [newRange.end.row+1, 0],
              ])))
          }
        })
      )
    })
  )
}

export function deactivate() {
  disposables && disposables.dispose()
  disposables = undefined
}
