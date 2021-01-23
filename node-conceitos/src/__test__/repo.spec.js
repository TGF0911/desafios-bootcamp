const request = require('supertest')
const app = require('../app')
const { validate: isUuid } = require('uuid')

describe('Repositories', () => {
  it('should be able to create a new repository', async () => {
    const response = await request(app)
      .post('/repositories')
      .send({
        url: "https://github.com/Rocketseat/umbriel",
        title: "Umbriel",
        techs: ["Node", "Express", "TypeScript"]
      })

    expect(isUuid(response.body.id)).toBe(true)

    expect(response.body).toMatchObject({
      url: "https://github.com/Rocketseat/umbriel",
      title: "Umbriel",
      techs: ["Node", "Express", "TypeScript"],
      likes: 0
    })
  })

  it("should be able to list the repositories", async () => {
    const repository = await request(app)
      .post("/repositories")
      .send({
        url: "https://github.com/Rocketseat/umbriel",
        title: "Umbriel",
        techs: ["Node", "Express", "TypeScript"]
      })

    const response = await request(app).get("/repositories")

    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          id: repository.body.id,
          url: "https://github.com/Rocketseat/umbriel",
          title: "Umbriel",
          techs: ["Node", "Express", "TypeScript"],
          likes: 0
        }
      ])
    )
  })

  it('should be able to update repository', async () => {
    const repository = await request(app)
      .post('/repositories')
      .send({
        url: "https://github.com/Rocketseat/umbriel",
        title: "Umbriel",
        techs: ["Node", "Express", "TypeScript"]
      })

    const response = await request(app)
      .put(`/repositories/${repository.body.id}`)
      .send({
        url: "https://github.com/Rocketseat/unform",
        title: "Unform",
        techs: ["React", "ReactNative", "TypeScript", "ContextApi"]
      })

      expect(isUuid(response.body.id)).toBe(true)

      expect(response.body).toMatchObject({
        url: "https://github.com/Rocketseat/unform",
        title: "Unform",
        techs: ["React", "ReactNative", "TypeScript", "ContextApi"]
      })
    })
  })
