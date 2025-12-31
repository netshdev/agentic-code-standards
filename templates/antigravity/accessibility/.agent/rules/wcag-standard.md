---
trigger: always_on
---

# WCAG 2.1 Standards Quick Reference

## Level A (Required)

### 1.1.1 Non-text Content

All images have alt text (or alt="" if decorative)

### 1.2.1 Audio/Video-only

Provide transcripts or text alternatives

### 1.2.2 Captions (Prerecorded)

All videos have captions

### 1.2.3 Audio Description

Provide audio descriptions for video

### 1.3.1 Info and Relationships

Use semantic HTML (headings, lists, tables, labels)

### 1.3.2 Meaningful Sequence

Reading order matches visual order

### 1.3.3 Sensory Characteristics

Don't rely on shape, size, location, or color alone

### 1.4.1 Use of Color

Don't use color alone to convey information

### 1.4.2 Audio Control

Provide pause/stop for auto-playing audio

### 2.1.1 Keyboard

All functionality available via keyboard

### 2.1.2 No Keyboard Trap

Users can navigate away from all components

### 2.1.4 Character Key Shortcuts

Single-key shortcuts can be turned off/remapped

### 2.2.1 Timing Adjustable

Users can turn off, adjust, or extend time limits

### 2.2.2 Pause, Stop, Hide

Control moving, blinking, or scrolling content

### 2.3.1 Three Flashes

Nothing flashes more than 3 times per second

### 2.4.1 Bypass Blocks

Skip links or landmarks to bypass repeated content

### 2.4.2 Page Titled

Pages have descriptive titles

### 2.4.3 Focus Order

Focus order is logical

### 2.4.4 Link Purpose

Link text describes destination

### 2.5.1 Pointer Gestures

Multipoint/path gestures have single-pointer alternative

### 2.5.2 Pointer Cancellation

Click functions trigger on up-event

### 2.5.3 Label in Name

Visible label matches accessible name

### 2.5.4 Motion Actuation

Motion-triggered functions have UI alternative

### 3.1.1 Language of Page

`<html lang="en">`

### 3.2.1 On Focus

Focus doesn't trigger unexpected changes

### 3.2.2 On Input

Input doesn't trigger unexpected changes

### 3.3.1 Error Identification

Errors are identified in text

### 3.3.2 Labels or Instructions

Form fields have labels

### 4.1.1 Parsing

HTML validates (no duplicate IDs, proper nesting)

### 4.1.2 Name, Role, Value

All UI components have accessible name, role, value

### 4.1.3 Status Messages

Status updates announced to screen readers

## Level AA (Required)

### 1.2.4 Captions (Live)

Live audio has captions

### 1.2.5 Audio Description

All videos have audio descriptions

### 1.3.4 Orientation

Works in portrait and landscape

### 1.3.5 Identify Input Purpose

Input fields have autocomplete attributes

### 1.4.3 Contrast (Minimum)

- Text: 4.5:1 contrast
- Large text: 3:1 contrast

### 1.4.4 Resize Text

Text resizes to 200% without loss of content

### 1.4.5 Images of Text

Avoid images of text (use real text)

### 1.4.10 Reflow

Content reflows at 320px without horizontal scroll

### 1.4.11 Non-text Contrast

UI components have 3:1 contrast

### 1.4.12 Text Spacing

Adjustable text spacing without loss of content

### 1.4.13 Content on Hover/Focus

Hoverable, dismissible, persistent

### 2.4.5 Multiple Ways

Multiple ways to find pages (menu, search, sitemap)

### 2.4.6 Headings and Labels

Headings and labels are descriptive

### 2.4.7 Focus Visible

Keyboard focus indicator is visible

### 3.1.2 Language of Parts

Language changes marked with lang attribute

### 3.2.3 Consistent Navigation

Navigation is consistent across pages

### 3.2.4 Consistent Identification

Components with same function have same labels

### 3.3.3 Error Suggestion

Provide suggestions for fixing errors

### 3.3.4 Error Prevention

Confirm/undo for legal/financial/data submissions

## Quick Testing Checklist

- [ ] All images have alt text
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Color contrast 4.5:1+
- [ ] Forms have labels
- [ ] Headings in order (h1→h2→h3)
- [ ] Screen reader tested
- [ ] Works at 200% zoom
- [ ] Touch targets 44x44px
- [ ] No auto-playing audio/video
- [ ] Status messages announced
- [ ] Valid HTML (W3C validator)
