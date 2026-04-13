# Cupcake Central MVP Components

## Overview

This repository contains a small case-study storefront prototype built in `shopify-proto` with React, TypeScript, and Vite.

The project focuses on two weak but commercially important interaction patterns:

- build-a-box product configuration
- cart progression and checkout readability for gift-box orders

The reference point was Cupcake Central's live storefront experience. The goal was not to clone the site pixel for pixel. The goal was to identify where the existing experience feels functional but under-optimised, then build sharper component patterns that feel more considered, more contextual, and more conversion-aware.

## Origin Of The Exercise

This started as a personal exploration rather than a formal client brief or redesign project.

I was browsing the Cupcake Central site like a normal customer and using it as an exercise: find a live storefront, move through it casually, notice what feels unclear or under-developed, and then build prototypes for the experience I would personally want to see if I were actually shopping there.

The clearest friction point for me was the `Build-a-Box` flow. On first use, I found it confusing that items appeared to be added one by one without enough guidance about how the box was actually being assembled. I was not confident whether a mini cupcake selection was being added into the same larger box flow, whether the box rules were fixed, or whether I was simply accumulating items without a clear structure.

I can understand why a customer might still keep clicking through and pick whatever looks good, but the interaction did not make enough sense to me as a shopper. That became the starting point for the prototype.

This case study is based on first-person customer friction rather than analytics instrumentation. It is an opinionated UX hypothesis, not a universal claim about all customers.

This is not meant as criticism of the existing developer team. The live site is functional. The exercise is simply a record of what I noticed as a customer, what I thought could be clearer, and the prototype patterns I would personally want to use instead.

## Goal Of This Prototype

Like my previous projects based on official live sites, this project is a practical exploration of one specific storefront feature, not a full platform rebuild.

The objective is direct:

- start from a real storefront interaction pattern
- rebuild it as a focused React prototype to inspect behaviour and UX clarity
- improve the parts that felt confusing in personal use, especially the build-a-box to cart handoff
- keep scope disciplined so the feature itself gets better instead of getting buried in platform-level complexity

## Case Study Goal

The case study focuses on a simple question:

How do you take a bakery storefront that already works at a basic level and make the customer journey feel clearer, warmer, and more commercially intelligent without turning it into manipulative nonsense?

That led to two component explorations:

1. `Build-a-Box`
2. `Cart Lab`

Each view is designed to demonstrate a specific merchandising or UX improvement rather than act as a full production storefront.

## What Was Built

### 1. Build-a-Box

The `Build-a-Box` flow turns a static cupcake selection into a guided product-configuration experience.

Key improvements:

- customers choose between regular and mini cupcake formats first
- valid box sizes update based on that format
- box completion progress is visible throughout selection
- low-stock flavours are flagged before the user over-commits
- sold-out flavours are clearly unavailable
- flavour selection respects stock limits instead of assuming infinite inventory
- completed selections are converted into a single gift-box cart line with box-specific imagery

Why it matters:

- it makes bakery ordering rules visible instead of forcing the customer to infer them
- it addresses the original confusion around whether cupcake selections were contributing to a coherent box or just being added as isolated items
- it reduces frustration when customers discover stock limits
- it makes the experience feel like a real configurable product rather than a grid of disconnected cards

### 2. Cart Lab

The `Cart Lab` view focuses on cart readability and checkout confidence, not just cart existence.

Key improvements:

- a global cart drawer persists across views
- the full cart page preserves a clean, editable summary format
- cart quantities respect actual stock ceilings
- cart items surface low-stock warnings when inventory is tight
- gift-message ribbon can be added directly in cart context
- the drawer includes continuation paths such as moving from browsing into build-a-box and then into cart review

Why it matters:

- shoppers can adjust orders without losing context
- a box-first cart summary is easier to scan than a clutter of disconnected line items
- real-time cart feedback reduces surprise at checkout

## Product Rationale

The case study deliberately avoids three common mistakes:

- over-engineering the prototype into a fake enterprise system
- polishing visuals while leaving interaction logic dishonest
- pretending one person's shopping friction is statistically universal truth

That is why several implementation details still matter:

- stock limits are enforced in selection and cart flows
- the build-a-box result is represented as a coherent box product in cart state
- box size changes trim invalid selections instead of silently keeping impossible states
- navigation between prototype views is intentional, not accidental

The result is still a prototype, but it behaves like a serious commerce interaction model rather than a decorative front-end exercise.

## Why Liquid Was Not Included In This Prototype

This prototype intentionally runs as a React case study instead of a full Shopify theme implementation.

Reasons:

- the immediate goal was to test interaction quality and state behaviour quickly
- adding Liquid in this repo would broaden scope into theme architecture before the component model was validated
- this work is intentionally focused on improving one feature path, not replicating an entire production storefront

The next step is a separate fork focused on implementing the same use case with Shopify Liquid sections/snippets.

## Technical Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS utilities alongside custom CSS

The prototype lives in `shopify-proto`.

## Project Structure

- `shopify-proto/src/app`: shell, routes, navigation
- `shopify-proto/src/features/build-a-box`: configurable box flow
- `shopify-proto/src/features/cart-drawer`: cart drawer and full cart review view
- `shopify-proto/src/data`: product and cupcake seed data

## Running The Project

From `shopify-proto`:

```bash
npm install
npm run dev
```

Useful commands:

```bash
npm run build
npm run lint
```

## Current State

The prototype currently demonstrates:

- a stock-aware build-a-box flow
- coherent box representation from selection flow into cart
- a cart drawer plus full cart review screen with editable line items
- consistent navigation between the two case-study views

Verification commands:

- `npm run build`
- `npm run lint`

## What This Case Study Shows

This project is meant to show product thinking as much as UI implementation.

It is not claiming to be a finished Shopify theme or production-ready storefront. It is showing:

- how to identify weak points in a commerce journey from first-person use
- how to use official storefront references as the basis for focused feature exploration
- how to turn those weak points into focused component explorations
- how to back UX claims with honest state and interaction logic
- how to scope a prototype without bloating it into an artificial platform rewrite

In short, the work is trying to answer a more useful question than "can this be styled nicely?"

The better question is:

Can this storefront pattern guide customers more clearly, recover more intent, and behave more honestly under real merchandising constraints?
