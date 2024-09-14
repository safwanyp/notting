# Notting

A note taking app built using the Ports and Adapters pattern (aka Hexagonal Architecture).

The app in it's current state is capable of performing data actions in-memory or in a Turso (sqlite) database.

# Tooling

- Hono
- TypeScript
- Vitest for testing

# How to run

1. Clone the repository
2. Run `pnpm i`
3. If running in-memory actions, make sure to use the `createInMemoryNoteRepository` adapter
4. Run `pnpm start` or `pnpm dev`
5. Hit any of the endpoints to interact with the app and go crazy!

---

# About the app

> 💡 Disclaimer: This particualr app is very simple. There is no complex logic, but the whole point of this app is to help me understand the fundamentals of the pattern.

My motivation for building this app came from the book [Hexagonal Architecture Explained](https://www.amazon.com/Hexagonal-Architecture-Explained-Alistair-Cockburn-ebook/dp/B0D4JQJ8KD) by Alistair Cockburn and Juan Manuel Garrido de Paz. The book encourages the reader to follow the code samples provided and I like to think it's to prevent the reader from falling into the "tutorial hell" people talk about. But why this app specifically? Well, I have been reading the book on Apple Books and my notes were simply too many. The book was covered with highlights of different colours which was kind of annoying. So I decided to put my newly acquired knowledge of the Ports and Adapters pattern into good use by starting work on a personal note taking app.

I started by simply noting down what I want this app to do once it's "complete". It all boiled down to these 3 things:

- View and read notes
- Detect when a note has changed
- Save changes if there have been any changes

Pretty straightforward.

Once I had this down, I tried to work on a diagram that will clearly illustrate what the ports and adapters will be. If you would like to the interact with a read-only version of the diagram, click on [this link](https://excalidraw.com/#json=B4Nvg57q3d7fRC5qMDTnU,zAhqbLq_poBE7U5PruYTOg) to head to Excalidraw.
![Notting Ports and Adapters diagram](./assets/notting%20-%20pna.png)

With this diagram, it was so much easier for me to understand exactly what I would need to do. The pattern recommends following a specific development sequence to make sure there's minimal friction in implementing everything. Verbatim from the first draft of the published book:

> 1. Test-to-test: Create the test as the first driver of the app, and connect it to a test double (in memory, mock, stub, fake, cetc).
> 2. Real-to-test: Put the production driver in place, connected to the test double.
> 3. Test-to-real: Connect tests to the production database, or a test database that uses the same technology as the production database.
> 4. Real-to-real: Finally, when everything else works, connect the production drive and the production database.
>
> Once you’ve completed step 1, the architecture is in place. After that, you can do the rest in any order. In particular, steps 2 and 3 might be swapped.
>
> _Hexagonal Architecture Explained: How the Ports & Adapters Architecture Simplifies Your Life, and How to Implement It (Series on Object-Oriented Design)_ ~ _Alistair Cockburn_

Embracing the spirit of the book, I decided to try and follow this sequence to see for myself how useful it really is. This is visible in the commit history of this repo.

The first commit was just a simple hello world, followed by implementation of the ports, the application logic and the tests to define the boundary of the application. Once I was satisfied with it, I created a new adapter for the Note Repository which uses Turso (a sqlite platform).

If it wasn't clear already, I skipped step 2 and 3 in the dev sequence. I didn't do it because of a particular reason, but just because I forgot 🥲 (old habits really do die hard). But that doesn't mean I won't be doing them. Just because I skipped them doesn't mean I can't go back and see what value it actually provides.

I work on this app during weekends and after-work hours, so let's see how far I can get!

### Future plans

- [ ] Create a frontend
  - [ ] CLI
  - [ ] Web
  - [ ] Mobile
- [ ] Implement a driver port to facilitate moving from one provider to another.
- [ ] Whatever else I can think of!
