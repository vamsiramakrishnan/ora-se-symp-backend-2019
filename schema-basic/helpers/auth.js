export const authenticated = fn => (parent, args, context, info) => {
    if (context && context.user) {
      return fn(parent, args, context, info)
    }
    throw new Error('User is not authenticated')
  }