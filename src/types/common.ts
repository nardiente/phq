export enum EmojiTypes {
  NONE = 'none',
  LIKE = 'like',
  HEART = 'heart',
  KISS = 'kiss',
  FIRE = 'fire',
  EYES = 'eyes',
  SAD = 'sad',
}

export enum Permissions {
  // Upvote/Roadmap Idea
  ADD_IDEA = 'add_idea',
  EDIT_IDEA = 'edit_idea',
  DELETE_IDEA = 'delete_idea',
  DRAG_IDEA = 'drag_idea',

  // Comment
  ADD_COMMENT = 'add_comment',
  HIDE_COMMENT = 'hide_comment',
  DELETE_COMMENT = 'delete_comment',

  // Reply
  ADD_REPLY = 'add_reply',

  // Emoji
  ADD_EMOJI = 'add_emoji',

  // Roadmap
  ADD_COLUMN = 'add_column',
  EDIT_COLUMN = 'edit_column',
  DRAG_COLUMN = 'drag_column',

  // What's new
  ADD_POST = 'add_post',
  EDIT_POST = 'edit_post',
  DELETE_POST = 'delete_post',

  // Account settings
  CHANGE_PASSWORD = 'change_password',
  ADD_CARD = 'add_card',
  DELETE_CARD = 'delete_card',
  DOWNLOAD_INVOICE = 'download_invoice',
  PROJECT_DETAILS = 'project_details',
  APPEARANCE = 'appearance',
  TRACKING = 'tracking',
  TAGS = 'tags',
}

export enum RbacPermissions {
  // Settings
  MANAGE_BILLING_INVOICING_PAGE = 'manage_billing_invoicing_page',
  MANAGE_ACCOUNT_DETAILS_PAGE = 'manage_account_details_page',
  MANAGE_PROJECT_DETAILS_PAGE = 'manage_project_details_page',
  MANAGE_TEAM_MEMBERS_PAGE = 'manage_team_members_page',
  MANAGE_TAGS_PAGE = 'manage_tags_page',

  // General
  CREATE_EDIT_HIDE_DELETE_OWN_PUBLIC_AND_INTERNAL_COMMENTS = 'create_edit_hide_delete_own_public_and_internal_comments',
  HIDE_DELETE_OTHERS_COMMENT = 'hide_delete_others_comments',
  DELETE_USER = 'delete_user',

  // Upvotes
  CREATE_EDIT_IDEAS = 'create_edit_ideas',
  VOTE_ON_YOUR_OWN_BEHALF = 'vote_on_your_own_behalf',
  VOTE_ON_OTHERS_BEHALF = 'vote_on_others_behalf',
  DELETE_IDEAS = 'delete_ideas',

  // Roadmap
  CHANGE_COLUMN_NAMES = 'change_column_names',
  CHANGE_ORDER_COLUMNS = 'change_order_columns',
  CHANGE_UPVOTE_PRIORITISATION_ROADMAP = 'change_upvote_prioritisation_roadmap',
  ADD_DELETE_COLUMNS = 'add_delete_columns',

  // What's new
  CREATE_EDIT_SAVE_DRAFT_SCHEDULE_POST_AND_DELETE_YOUR_OWN_POST = 'create_edit_save_draft_schedule_post_and_delete_your_own_post',
  SCHEDULE_OTHERS_POST = 'schedule_others_post',
  MOVE_ANY_POST_FROM_PUBLISHED_TO_DRAFT = 'move_any_post_from_published_to_draft',
  PIN_POSTS = 'pin_posts',
  EDIT_SAVE_DRAFT_SCHEDULE_POST_AND_DELETE_OTHERS_POST = 'edit_save_draft_schedule_post_and_delete_others_post',
}
