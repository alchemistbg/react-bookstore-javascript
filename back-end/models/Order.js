        get: v => v.toString()
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Processing', 'Packed', 'Sent', 'Canceled', 'Completed'],
        default: 'Pending'
    },
