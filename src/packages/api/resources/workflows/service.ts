import * as csvwriter from 'csv-writer'

import { Workflow } from '~/packages/database/models/workflow'

export const generateWorkflowCSV = async (workflow: Workflow): Promise<any> => {
  try {
    const entries = []
    entries.push(workflow.data)
    const path = `${__dirname}/../../../../../sheets/${workflow.uuid}.csv`
    const writer = csvwriter.createObjectCsvWriter({
      path,
      header: [
        { id: 'name', title: 'Name' },
        { id: 'description', title: 'Description' },
      ],
    })
    await writer.writeRecords(entries)
    return path
  } catch (err) {
    console.log(err)
    return null
  }
}
