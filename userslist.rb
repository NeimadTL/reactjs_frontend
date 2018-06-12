# Q1
require 'set'

class UserList

  USERS = [
    'Delphine Chartier',
    'Barbara Decaux',
    'Adrien Sardaban',
    'Delphine CHARTIER',
    'sardaban adrien',
    'Basile Dirac',
    'adrien sardaban'
  ]

  def initialize
    @users = Set.new
    @duplicates = []
  end

  def find_duplicate
    USERS.each do |user|
      if duplicate?(user)
        @duplicates << duplicates(user)
      end
    end
    puts "@users -> #{@users.inspect}"
    puts "@duplicates -> #{@duplicates}"
  end

  private

    def duplicate?(user)
      @users.add?(user.downcase).nil?
    end

    def duplicates(user)
      lowercased_user = user.downcase
      USERS.map { |value| value if value.downcase.eql?(lowercased_user) }.compact
      # USERS.reject { |value| !value.downcase.eql?(lowercased_user) }
    end

end

user_list = UserList.new
user_list.find_duplicate


# Q2
# To be honest, I don't remember what is called time and space complexity of a program even worse
# when it comes to O(n). I kind of had an idea of what is was back when I was in school but now it's
# completely out of my mind.

# Q3
# My first test would be when there are no users so it should return zero duplicates I'll check for
# the emptiness of the duplicates list.
# My second test would be when there are uniq users so it should return zero duplicates. I'll check for
# the size of the duplicates list)
# My third test would be when there are duplicated users so it should return the duplicates. I'll check for
# the expected size of the duplicates list and for expected users to come out as duplicate.

# Q4
# I'm not sure that my solution is the best or even if it is correct but here's what I would do :
# I would load only a small part of the input file in memory, process the data and repeat that until
# the end of the input file. We could also process the data in parallel way for faster processing
# though I don't know how to write it.
