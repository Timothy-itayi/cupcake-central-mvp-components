# Cupcake Central MVP Components

## Overview

This repository contains a small case-study storefront prototype built in `shopify-proto` with React, TypeScript, and Vite.

The project explores how a bakery-style Shopify storefront could improve three weak but commercially important interaction patterns:

- build-a-box product configuration
- cart progression and contextual upsell behaviour
- low-stock merchandising and sold-out fallback handling

The reference point was Cupcake Central's live storefront experience. The goal was not to clone the site pixel for pixel. The goal was to identify where the existing experience feels functional but under-optimised, then build sharper component patterns that feel more considered, more contextual, and more conversion-aware.

## Origin Of The Exercise

This started as a casual exploration rather than a formal client brief or redesign project.

I was browsing the Cupcake Central site like a normal customer and using it as an exercise: find a live storefront, move through it casually, notice what feels unclear or under-developed, and then build prototypes for the experience I would personally want to see if I were actually shopping there.

The clearest friction point for me was the `Build-a-Box` flow. On first use, I found it confusing that items appeared to be added one by one without enough guidance about how the box was actually being assembled. I was not confident whether a mini cupcake selection was being added into the same larger box flow, whether the box rules were fixed, or whether I was simply accumulating items without a clear structure.

I can understand why a customer might still keep clicking through and pick whatever looks good, but the interaction did not make enough sense to me as a shopper. That became the starting point for the prototype.

This is not meant as criticism of the existing developer team. The live site is functional. The exercise is simply a record of what I noticed as a customer, what I thought could be clearer, and the prototype patterns I would personally want to use instead.

## Case Study Goal

The case study focuses on a simple question:

How do you take a bakery storefront that already works at a basic level and make the customer journey feel clearer, warmer, and more commercially intelligent without turning it into manipulative nonsense?

That led to three component explorations:

1. `Build-a-Box`
2. `Cart Lab`
3. `Low Stock`

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

Why it matters:

- it makes bakery ordering rules visible instead of forcing the customer to infer them
- it addresses the original confusion around whether cupcake selections were contributing to a coherent box or just being added as isolated items
- it reduces frustration when customers discover stock limits
- it makes the experience feel like a real configurable product rather than a grid of disconnected cards

### 2. Cart Lab

The `Cart Lab` view focuses on cart quality, not just cart existence.

Key improvements:

- a global cart drawer persists across views
- free-delivery progress is visible and updates live
- the cart shows exactly how far the order is from the threshold
- contextual upsells change based on what is already in the basket
- cart quantities respect actual stock ceilings
- cart items surface low-stock warnings when inventory is tight
- the drawer includes continuation paths such as keeping browsing or jumping into build-a-box

Why it matters:

- the free-delivery threshold gives customers a concrete reason to add more
- contextual upsells feel more credible than random add-on spam
- real-time cart feedback reduces surprise at checkout

### 3. Low Stock

The `Low Stock` view treats inventory pressure as a merchandising pattern rather than a technical badge demo.

Key improvements:

- bakery-specific urgency language replaces generic stock labels
- customers can filter to low-stock products only
- sold-out products offer an alternative in-stock product where possible
- urgency appears only when stock is genuinely low

Why it matters:

- low-stock messaging only works if it feels specific and believable
- sold-out dead ends waste demand
- this pattern helps redirect intent instead of letting the customer stall

## Product Rationale

The case study deliberately avoids two common mistakes:

- over-engineering the prototype into a fake enterprise system
- polishing the visuals while leaving the business logic dishonest

That is why several implementation details matter:

- stock limits are enforced in selection and cart flows
- upsells are tied to basket contents
- low-stock messaging is conditional rather than globally sprayed everywhere
- navigation between prototype views is intentional, not accidental

The result is still a prototype, but it behaves like a serious commerce interaction model rather than a decorative front-end exercise.

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
- `shopify-proto/src/features/cart-drawer`: cart drawer, upsell, delivery progress
- `shopify-proto/src/features/low-stock`: inventory urgency and fallback merchandising
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
- a cart drawer with free-delivery progress and contextual upsells
- low-stock filtering and sold-out alternatives
- consistent navigation between component case-study views

Recent verification:

- `npm run build` passes
- `npm run lint` passes

## What This Case Study Shows

This project is meant to show product thinking as much as UI implementation.

It is not claiming to be a finished Shopify theme or production-ready storefront. It is showing:

- how to identify weak points in an existing commerce journey
- how to turn those weak points into focused component explorations
- how to back UX claims with actual state and interaction logic

In short, the work is trying to answer a more useful question than "can this be styled nicely?"

The better question is:

Can this storefront pattern guide customers more clearly, recover more intent, and behave more honestly under real merchandising constraints?
